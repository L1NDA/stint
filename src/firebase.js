import * as firebase from 'firebase';
const {firebaseConfig} = require("./config")

firebase.initializeApp(firebaseConfig);

export default firebase;
