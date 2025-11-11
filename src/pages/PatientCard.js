import React, { useState } from "react";

export default function PatientCard({ patient, onSave }) {
  const [prescription, setPrescription] = useState("");

  return (
    <div style={{ border: "1px solid #aaa", margin: "10px", padding: "10px" }}>
      <h4>{patient.name} (Age: {patient.age})</h4>
      <p>Token: {patient.token}</p>
      <textarea
        placeholder="Enter prescription..."
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
      />
      <br />
      <button onClick={() => onSave(patient.id, prescription)}>Save</button>
    </div>
  );
}
