import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDYgu5xWnp9YB7XLGNvvnytwc_J0SXswcU",
  authDomain: "travel-web-3e599.firebaseapp.com",
  databaseURL: "https://travel-web-3e599-default-rtdb.firebaseio.com",
  projectId: "travel-web-3e599",
  storageBucket: "travel-web-3e599.appspot.com",
  messagingSenderId: "967666322417",
  appId: "1:967666322417:web:c1bd6a4a30ad6790c99250",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
