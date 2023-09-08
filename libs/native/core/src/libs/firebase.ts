
import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {
  onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signOut as _signOut,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useState, useEffect } from 'react';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB03C8I4qH0YXyrNAEaKaBsmY2t9_sZaCI",
  authDomain: "dealerdesk-92b07.firebaseapp.com",
  projectId: "dealerdesk-92b07",
  storageBucket: "dealerdesk-92b07.appspot.com",
  messagingSenderId: "610031143893",
  appId: "1:610031143893:web:95bfa4adf9285d91860b5c"
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
      await AsyncStorage.setItem(TOKEN_KEY, await res.user?.getIdToken())
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
      await AsyncStorage.setItem(TOKEN_KEY, await res.user?.getIdToken())
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
      await AsyncStorage.removeItem(TOKEN_KEY)
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

