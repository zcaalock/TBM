import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDH_hiOBxaDyXSyZ6EaXtLtbx2Cv9tblHI",
  authDomain: "quickstart-1561998550467.firebaseapp.com",
  databaseURL: "https://quickstart-1561998550467.firebaseio.com/",
  projectId: "quickstart-1561998550467",
  storageBucket: "",
  messagingSenderId: "1091712667896",
  appId: "1:1091712667896:web:7f3c2f9dd78115b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const appRef = databaseRef.child("app")