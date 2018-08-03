import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
let config = {
    apiKey: "apikey",
    authDomain: "domain",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "id",
    storageBucket: "bucketid",
    messagingSenderId: "<SENDER_ID>",
  };
  
firebase.initializeApp(config);

export const auth = firebase.auth();