import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
let config = {
    apiKey: "AIzaSyC5Z90oDUqfKRV46omkkAnlB0Lk5Cq6DLo",
    authDomain: "fir-forum-4f242.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "fir-forum-4f242",
    storageBucket: "fir-forum-4f242.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  
firebase.initializeApp(config);

export const auth = firebase.auth();