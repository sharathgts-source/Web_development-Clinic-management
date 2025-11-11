# Clinic Direction System (Skeleton)

This repository is a complete **skeleton** for the "Direction" work-assistance program described by the user.
It contains:
- Frontend (React) skeleton that uses Firebase Web SDK for Authentication & Firestore.
- Backend (Express) skeleton that uses Firebase Admin SDK for admin operations (optional).
- Logging using `winston` on the backend and console-structured logs on frontend.
- Documentation: LLD (Low-level design), Architecture, Wireframe, Deployment notes.
- Sample Firestore data model and sample routes for token generation, patient records, prescriptions, and billing.

> **Important:** This is a ready-to-customize starter project. Before running, you must add your Firebase project configuration:
> - For frontend: update `frontend/.env.local` with your Firebase Web config.
> - For backend: place your Firebase service account JSON at `backend/serviceAccount.json` (not included).

## Download
This archive was prepared for you. See the zip in the same folder.

## Quick start (frontend-only, using Firebase)
1. `cd frontend`
2. `npm install`
3. Create `.env.local` based on `.env.example`
4. `npm start`

## Quick start (backend)
1. `cd backend`
2. `npm install`
3. Place `serviceAccount.json` (Firebase Admin SDK) into `backend/`
4. `npm run dev`

Refer to `docs/` for full LLD and architecture decisions.
