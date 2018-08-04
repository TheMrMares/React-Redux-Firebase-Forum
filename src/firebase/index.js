import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
let config = {
    apiKey: "apikey",
    authDomain: "authdomain",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "projectid",
    storageBucket: "storage",
    messagingSenderId: "<SENDER_ID>",
  };
  
firebase.initializeApp(config);

export const auth = firebase.auth();
