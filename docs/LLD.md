# Low Level Design (LLD)

## Overview
This document describes data models, key algorithms, API contracts, and logging.

## Firestore Collections
- **patients**
  - id (auto)
  - name, phone, dob, address
  - createdAt
  - tokens: array of {amount, createdAt, by}
  - prescriptions: array of {drug, dosage, notes, prescribedBy, date}
  - bills: array of {amount, items, status, createdAt}
- **users**
  - uid, name, role (doctor/receptionist), email
- **logs** (optional)
  - action, performedBy, timestamp, metadata

## API Contracts (examples)
1. Receptionist creates patient:
  - POST /api/receptionist/createPatient
  - Body: { name, phone, dob }
  - Response: { id, tokenAmount }

2. Doctor adds prescription:
  - POST /api/doctor/addPrescription
  - Body: { patientId, prescription }

## Token generation
- Token is auto-generated on patient creation.
- Example strategy: secure random number or incrementing queue token.
- Ensure uniqueness by combining timestamp + random suffix.

## Logging
- All actions log with `winston` on the server.
- Frontend logs important user interactions to console (or to a remote logging endpoint).

## Authentication
- Use Firebase Authentication (Email/Password) for users.
- Use custom claims to assign roles (doctor vs receptionist).
