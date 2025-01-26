import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'Replace Your Firebase API Key Here',
  authDomain: 'Replace Your Firebase Auth Domain Here',
  projectId: 'Replace Your Firebase Project ID Here',
  storageBucket: 'Replace Your Firebase Storage Bucket Here',
  messagingSenderId: 'Replace Your Firebase Messaging Sender ID Here',
  appId: 'Replace Your Firebase App ID Here',
  measurementId: 'Replace Your Firebase Measurement ID Here'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Functions
const functions = getFunctions(firebaseApp);

export { firebaseApp, functions };
