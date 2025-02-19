import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOI8BbO_9qNa9O9LnEZVkTHjAQBYf14yE",
  authDomain: "cocomaco-feedback.firebaseapp.com",
  projectId: "cocomaco-feedback",
  storageBucket: "cocomaco-feedback.firebasestorage.app",
  messagingSenderId: "358614603886",
  appId: "1:358614603886:web:b40da53cad53377a332e7f",
  measurementId: "G-BQNB0K6E1F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);