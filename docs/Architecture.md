# System Architecture

## Components
- **Frontend (React app)**: UI for Doctor and Receptionist, uses Firebase Web SDK, interacts with backend for admin actions.
- **Backend (Express)**: Optional; used for admin-level operations with Firebase Admin SDK and for audit logging.
- **Firestore (Firebase)**: Primary database for patients, tokens, prescriptions, bills.
- **Firebase Authentication**: Manages users and roles.

## Sequence
1. Receptionist logs in -> creates patient -> token assigned -> patient stored in Firestore.
2. Doctor logs in -> views patient -> updates prescription -> writes to Firestore.
3. Billing created by receptionist referencing patient records.

## Deployment options
- **Cloud**: Host frontend on Firebase Hosting, backend on Google Cloud Run or Firebase Functions.
- **Local / Edge**: Backend containerized and run on edge device; database remains Firestore (cloud).
- Justification: Firestore as managed DB reduces maintenance; Hosting + Cloud Run simplifies deployment.

## Security
- Use Firebase rules for Firestore to restrict reads/writes by role.
- Secure backend with service account; restrict service account usage.
