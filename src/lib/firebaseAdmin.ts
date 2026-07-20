import admin from 'firebase-admin';

function getFirebaseAdminApp() {
  if (admin.apps.length) {
    return admin.app();
  }

  const credentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}');

  if (!credentials.project_id) {
    throw new Error(
      'Missing FIREBASE_ADMIN_CREDENTIALS project_id for Firebase Admin SDK.'
    );
  }

  // private_key의 개행문자 처리
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
  }

  return admin.initializeApp({
    credential: admin.credential.cert(credentials),
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || credentials.project_id,
  });
}

export function getAdminDb() {
  return getFirebaseAdminApp().firestore();
}

export function getAdminAuth() {
  return getFirebaseAdminApp().auth();
}

export { admin };
