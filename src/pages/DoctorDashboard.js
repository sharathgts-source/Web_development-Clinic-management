import React, { useEffect, useState } from "react";
import PatientCard from "./PatientCard";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);

  const handlePrescription = async (id, prescription) => {
    await fetch(`http://localhost:4000/api/prescription/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prescription }),
    });
    alert("Prescription saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} onSave={handlePrescription} />
      ))}
    </div>
  );
}
