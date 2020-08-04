const INDEX_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/stint-staging-eb100/us-central1/"
    : "https://us-central1-stint-staging-eb100.cloudfunctions.net/";

const STRIPE_PK = 
  process.env.NODE_ENV === "development"
    ? "pk_test_51GwtRRKhM1dSlL34AnTKoowDLOA8CVwr1MmV0r1YcMxbWoesYlYnEDR3oPh0luqTEXJ1VzJ8kbOeN8b9mI5OhYHy00tzGPnvEE"
    : "pk_live_51GwtRRKhM1dSlL34hqbSjPZqDK5sK3QXG4zwIkhLuXAz2ZX6pVZGZ675Pul9tS1FNNileXGfLEHOYXDXemkOI14300DUEYCJlU"

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


module.exports = { firebaseConfig, INDEX_URL, STRIPE_PK };
