const INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/stint-staging-eb100/us-central1/"
    : "https://us-central1-stint-staging-eb100.cloudfunctions.net/";

const firebaseConfig = {
  apiKey: "AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0",
  authDomain: "stint-staging-eb100.firebaseapp.com",
  databaseURL: "https://stint-staging-eb100.firebaseio.com",
  projectId: "stint-staging-eb100",
  storageBucket: "stint-staging-eb100.appspot.com",
  messagingSenderId: "169383986878",
  appId: "1:169383986878:web:bbe35a48de3b4100c580ef",
  measurementId: "G-3D8HWH7J3R",
};

module.exports = { firebaseConfig, INDEX_URL };
