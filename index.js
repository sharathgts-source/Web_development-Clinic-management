// Backend skeleton using Express + Firebase Admin + winston logging
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'backend/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'backend/logs/combined.log' }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// initialize firebase admin: requires backend/serviceAccount.json
try {
  const serviceAccount = require('./serviceAccount.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  logger.info('Initialized Firebase Admin SDK');
} catch (err) {
  logger.warn('Firebase service account not found. Admin routes will not work until serviceAccount.json is provided.');
}

const db = admin.firestore ? admin.firestore() : null;

/*
Data model (Firestore collections):
- patients (docId = auto)
  - name, phone, dob, address, createdAt, tokens: [ {amount, createdAt, by} ], prescriptions: [ ... ], bills: [...]
- tokens (optional) for queueing
- logs (optional) for audit
*/

// simple token generator endpoint (demo)
app.post('/api/receptionist/createPatient', async (req, res) => {
  const { name, phone, dob } = req.body;
  try {
    const tokenAmount = Math.floor(Math.random()*10000) + 100; // demo token generation (replace with real logic)
    const patient = {
      name, phone, dob, createdAt: new Date().toISOString(), tokens: [{ amount: tokenAmount, createdAt: new Date().toISOString(), by: 'receptionist' }]
    };
    if (db) {
      const doc = await db.collection('patients').add(patient);
      logger.info('Created patient', { id: doc.id, by: 'receptionist' });
      return res.json({ id: doc.id, tokenAmount });
    } else {
      // fallback: write to local json file
      const dbFile = './backend/local_db.json';
      let local = { patients: [] };
      if (fs.existsSync(dbFile)) local = JSON.parse(fs.readFileSync(dbFile));
      patient.id = 'local-' + (local.patients.length+1);
      local.patients.push(patient);
      fs.writeFileSync(dbFile, JSON.stringify(local, null,2));
      logger.info('Wrote patient to local_db.json', { id: patient.id });
      return res.json({ id: patient.id, tokenAmount });
    }
  } catch (err) {
    logger.error('createPatient error', {error: err.message});
    return res.status(500).json({ error: err.message });
  }
});

// doctor adds prescription
app.post('/api/doctor/addPrescription', async (req,res) => {
  const { patientId, prescription } = req.body;
  try {
    if (db) {
      const docRef = db.collection('patients').doc(patientId);
      await docRef.update({ prescriptions: admin.firestore.FieldValue.arrayUnion(prescription) });
      logger.info('Added prescription', { patientId });
      return res.json({ ok:true });
    } else {
      // local fallback
      const dbFile = './backend/local_db.json';
      if (!fs.existsSync(dbFile)) return res.status(404).json({ error: 'local db not found' });
      const local = JSON.parse(fs.readFileSync(dbFile));
      const p = local.patients.find(x=>x.id===patientId);
      if (!p) return res.status(404).json({ error: 'patient not found' });
      p.prescriptions = p.prescriptions || [];
      p.prescriptions.push(prescription);
      fs.writeFileSync(dbFile, JSON.stringify(local, null,2));
      logger.info('Added prescription locally', { patientId });
      return res.json({ ok:true });
    }
  } catch (err) {
    logger.error('addPrescription error', {error: err.message});
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> logger.info('Server listening on '+PORT));
