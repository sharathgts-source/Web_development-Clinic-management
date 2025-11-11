# Logging

- Backend uses `winston` with JSON formatted logs written to `backend/logs/combined.log`.
- In production, consider pushing logs to Cloud Logging (Stackdriver) or ElasticSearch.
- Log all CRUD actions: createPatient, addPrescription, generateBill, userLogin, etc.
