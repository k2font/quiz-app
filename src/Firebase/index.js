import ENV from '../env.json';

import firebase from 'firebase/app';

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DB_URL,
    projectId: ENV.FIREBASE_PRJ_ID,
    storageBucket: ENV.FIREBASE_STORAGE,
    messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

var db = firebase.firestore();
const storage = firebase.storage();

export {
    firebase, db, storage
}