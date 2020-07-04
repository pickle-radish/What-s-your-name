import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "easy-name-card-47671.firebaseapp.com",
  databaseURL: "https://easy-name-card-47671.firebaseio.com",
  projectId: "easy-name-card-47671",
  storageBucket: "easy-name-card-47671.appspot.com",
  messagingSenderId: "854642965580",
  appId: "1:854642965580:web:3ef00bda820b29dfecc8e9",
  measurementId: "G-FKFSNHQDD9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase
// firebase.analytics();