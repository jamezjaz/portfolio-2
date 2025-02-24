// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  Timestamp,
  addDoc,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfbBk8CXnSJQvcPUi8mxIcZIlgz60RIcs",
  authDomain: "portfolio-2-5fd25.firebaseapp.com",
  projectId: "portfolio-2-5fd25",
  storageBucket: "portfolio-2-5fd25.appspot.com",
  messagingSenderId: "778757881801",
  appId: "1:778757881801:web:ea0f0331ec733c4fd43218",
  measurementId: "G-MNVJ79Y014"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // No need to check if firebase has already been initialized v9 or above

// Initialize Firebase Analytics if supported
let analytics: Analytics | undefined; // Explicitly type as Analytics or undefined
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { analytics };

// Export Firestore functions
export {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  Timestamp,
  addDoc,
};

export type {
  QueryDocumentSnapshot,
  DocumentData
};

export default app;

/**
 * For deployments
 * firebase login (login into firebase)
 * firebase init (initialize firebase)
 * firebase deploy (deploy app)
 */
