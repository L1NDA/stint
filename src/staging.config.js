<<<<<<< HEAD
const INDEX_URL = process.env.NODE_ENV === "development" ? "http://localhost:5001/stint-landing/us-central1/" : "https://www.wearestint.com/"
=======
const INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/stint-landing/us-central1/"
    : "https://www.wearestint.com/";
>>>>>>> develop

const firebaseConfig = {
  apiKey: "AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0",
  authDomain: "stint-staging-eb100.firebaseapp.com",
  databaseURL: "https://stint-staging-eb100.firebaseio.com",
  projectId: "stint-staging-eb100",
  storageBucket: "stint-staging-eb100.appspot.com",
  messagingSenderId: "169383986878",
  appId: "1:169383986878:web:bbe35a48de3b4100c580ef",
<<<<<<< HEAD
  measurementId: "G-3D8HWH7J3R"
};

module.exports = { firebaseConfig,  INDEX_URL }
=======
  measurementId: "G-3D8HWH7J3R",
};

module.exports = { firebaseConfig, INDEX_URL };
>>>>>>> develop
