const INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://wearestint.com"

const FUNCTIONS_INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/stint-landing/us-central1/"
    : "https://us-central1-stint-landing.cloudfunctions.net/";

const STRIPE_PK = 
  process.env.NODE_ENV === "development"
    ? "pk_test_51GwtRRKhM1dSlL34AnTKoowDLOA8CVwr1MmV0r1YcMxbWoesYlYnEDR3oPh0luqTEXJ1VzJ8kbOeN8b9mI5OhYHy00tzGPnvEE"
    : "pk_live_51GwtRRKhM1dSlL34hqbSjPZqDK5sK3QXG4zwIkhLuXAz2ZX6pVZGZ675Pul9tS1FNNileXGfLEHOYXDXemkOI14300DUEYCJlU"

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

module.exports = { firebaseConfig, FUNCTIONS_INDEX_URL, INDEX_URL, STRIPE_PK };
