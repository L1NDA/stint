import * as firebase from "firebase";
import { createStore, combineReducers, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import "firebase/storage";

const { firebaseConfig } = require("./config");

firebase.initializeApp(firebaseConfig);

firebase.analytics();

const rrfConfig = {
  userProfile: "freelancers",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
});

const initialState = {};

export const store = createStore(rootReducer, initialState);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

export default firebase;
