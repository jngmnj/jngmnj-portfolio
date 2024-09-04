// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAr4Sqzp9Vah87TFRVpyW04a8q3kixnDRE',
  authDomain: 'jngmnj-portfolio.firebaseapp.com',
  projectId: 'jngmnj-portfolio',
  storageBucket: 'jngmnj-portfolio.appspot.com',
  messagingSenderId: '215341067315',
  appId: '1:215341067315:web:0f22638b2b5dbcfce68746',
  measurementId: 'G-RZM0H4WBY4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// let analytics = null;
// if (app.name && typeof window !== 'undefined') {
//   analytics = getAnalytics(app);
// }

// firestore
const db = getFirestore(app);

export { app, auth, db };
