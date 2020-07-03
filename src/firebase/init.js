import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "easy-name-card.firebaseapp.com",
  databaseURL: "https://easy-name-card.firebaseio.com",
  projectId: "easy-name-card",
  storageBucket: "easy-name-card.appspot.com",
  messagingSenderId: "427420481851",
  appId: "1:427420481851:web:06794cd20cb8bf54111f1e",
  measurementId: "G-87V9PWK3F4"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// firebase.analytics();