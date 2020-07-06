import * as firebase from 'firebase';
import { createStore, combineReducers, compose } from 'redux'
import {
  firebaseReducer
} from 'react-redux-firebase'

const {firebaseConfig} = require("./config")

firebase.initializeApp({
  apiKey: "AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU",
  authDomain: "stint-landing.firebaseapp.com",
  databaseURL: "https://stint-landing.firebaseio.com",
  projectId: "stint-landing",
  storageBucket: "stint-landing.appspot.com",
  messagingSenderId: "989807747408",
  appId: "1:989807747408:web:fe02b8a376979ad8608c55",
  measurementId: "G-XLX384B7P4"
});
firebase.analytics()

const rrfConfig = {
  userProfile: 'freelancers'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

const initialState = {}

export const store = createStore(rootReducer, initialState)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

export default firebase;
