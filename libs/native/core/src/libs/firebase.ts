
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

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const TOKEN_KEY = 'token'

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await _signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await _createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await _signOut(auth);
    } catch (error: any) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
  };
};

