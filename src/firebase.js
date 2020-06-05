import * as firebase from 'firebase';
<<<<<<< HEAD

const firebaseConfig = {
  apiKey: "AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU",
  authDomain: "stint-landing.firebaseapp.com",
  databaseURL: "https://stint-landing.firebaseio.com",
  projectId: "stint-landing",
  storageBucket: "stint-landing.appspot.com",
  messagingSenderId: "989807747408",
  appId: "1:989807747408:web:fe02b8a376979ad8608c55",
  measurementId: "G-XLX384B7P4"
=======
const config = require("./config.json")

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
>>>>>>> 2b90759ff080702227371fddf40ca06269477d29
};

firebase.initializeApp(firebaseConfig);

export default firebase;
