// v9
// commented code are for v9 firebase.
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getFirestore, initializeFirestore } from 'firebase/firestore';
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// v8 import syntax in v9
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
let app;

// if (getApps().length === 0) {

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
  // app = initializeApp(firebaseConfig);
} else {
  app = firebase.default.app();
  // app = getApp();
}

// https://firebase.google.com/docs/web/modular-upgrade
const db = app.firestore();
// const db = initializeFirestore();

// can also do app.auth() but firebase recommends below

const auth = firebase.default.auth();
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export { db, auth };
