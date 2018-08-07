import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
let config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
  };
  
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.useDeviceLanguage();
googleProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export const firestore = firebase.firestore();


firestore.settings({
  timestampsInSnapshots: true
});