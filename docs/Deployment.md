# Deployment Notes

## Firebase Hosting (Frontend)
1. Build frontend: `npm run build`
2. `firebase init hosting`
3. `firebase deploy --only hosting`

## Backend
Options:
- Google Cloud Run: containerize backend and deploy.
- Firebase Functions: rewrite endpoints as functions.

## Justification
Using Firebase (Auth + Firestore + Hosting) provides a serverless, scalable backend appropriate for a clinic app with variable traffic and minimal ops overhead.
