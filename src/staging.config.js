const INDEX_URL = process.env.NODE_ENV === "development" ? "http://localhost:5001/stint-landing/us-central1/" : "https://www.wearestint.com/"

const firebaseConfig = {
  apiKey: "AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0",
  authDomain: "stint-staging-eb100.firebaseapp.com",
  databaseURL: "https://stint-staging-eb100.firebaseio.com",
  projectId: "stint-staging-eb100",
  storageBucket: "stint-staging-eb100.appspot.com",
  messagingSenderId: "169383986878",
  appId: "1:169383986878:web:bbe35a48de3b4100c580ef",
  measurementId: "G-3D8HWH7J3R"
};

const linkedinConfig = {
  "apiSecret": "Ufu7HAVUGxxZO21j",
  "apiId": "78jv0jjr40mh6x"
}

const githubConfig = {
  "apiSecret": "d707ca8a7d49d6eea7d840054f5d57684f171750",
  "apiId": "090ce4141938fb7d2fb5"
}

const mailConfig = {
  "address": "wearestint@gmail.com",
  "password": "B00tterfly"
}

module.exports = { firebaseConfig, linkedinConfig, mailConfig, githubConfig, INDEX_URL }