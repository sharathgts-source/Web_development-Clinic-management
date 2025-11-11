import React, {useState} from 'react';
import { auth } from './firebaseConfig';
import DoctorDashboard from './pages/DoctorDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';

// NOTE: This is a skeleton. Add routing/auth flows in your implementation.
export default function App(){
  const [role, setRole] = useState('receptionist'); // change to 'doctor' to preview doctor's view
  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20}}>
      <h1>Clinic Direction — Skeleton</h1>
      <div style={{marginBottom:10}}>
        <label>Select role: </label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="receptionist">Receptionist</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>
      {role==='receptionist' ? <ReceptionistDashboard /> : <DoctorDashboard />}
    </div>
  );
}