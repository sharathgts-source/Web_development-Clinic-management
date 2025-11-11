import React, { useState, useEffect } from "react";

import { API_BASE_URL } from "../config";

await fetch(`${API_BASE_URL}/api/patients`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});


export default function ReceptionistDashboard() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", token: "" });

  useEffect(() => {
    fetch("http://localhost:4000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Patient added!");
    setForm({ name: "", age: "", token: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Receptionist Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          placeholder="Token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
        />
        <button type="submit">Add Patient</button>
      </form>

      <h3>Existing Patients</h3>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>{p.name} - Token: {p.token}</li>
        ))}
      </ul>
    </div>
  );
}
