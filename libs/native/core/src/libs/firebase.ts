
import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {
  onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signOut as _signOut,
  initializeAuth,
} from "firebase/auth";

import { useState, useEffect } from 'react';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyB03C8I4qH0YXyrNAEaKaBsmY2t9_sZaCI",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "dealerdesk-92b07.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "dealerdesk-92b07",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "dealerdesk-92b07.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "610031143893",
  appId: process.env.FIREBASE_APP_ID || "1:610031143893:web:95bfa4adf9285d91860b5c"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {

});

