import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getFirebaseAdminApp() {
  if (getApps().length) {
    return getApp();
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

  return initializeApp({
    credential: cert(credentials),
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || credentials.project_id,
  });
}

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}
