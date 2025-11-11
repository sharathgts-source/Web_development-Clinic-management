import React from "react";

export default function Login({ onSelectRole }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Clinic Direction System</h2>
      <p>Select your role to continue:</p>
      <button onClick={() => onSelectRole("doctor")}>Doctor Login</button>
      <button onClick={() => onSelectRole("receptionist")} style={{ marginLeft: "10px" }}>
        Receptionist Login
      </button>
    </div>
  );
}
