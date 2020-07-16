const INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/stint-landing/us-central1/"
    : "https://us-central1-stint-landing.cloudfunctions.net/";

const firebaseConfig = {
  "apiKey": "AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU",
  "authDomain": "stint-landing.firebaseapp.com",
  "databaseURL": "https://stint-landing.firebaseio.com",
  "projectId": "stint-landing",
  "storageBucket": "stint-landing.appspot.com",
  "messagingSenderId": "989807747408",
  "appId": "1:989807747408:web:fe02b8a376979ad8608c55",
  "measurementId": "G-XLX384B7P4"
}

module.exports = { firebaseConfig, INDEX_URL };