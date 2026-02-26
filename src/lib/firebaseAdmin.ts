import admin from 'firebase-admin';

// Firebase Admin SDK 초기화 (중복 초기화 방지)
if (!admin.apps.length) {
  const credentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}');
  
  // private_key의 개행문자 처리
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
  }
  
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export { admin };