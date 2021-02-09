import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD3ZRb0HNIzKsXIkFnHw76_MzuL-s4_s8s",
    authDomain: "open-chat-room.firebaseapp.com",
    databaseURL: "https://open-chat-room.firebaseio.com",
    projectId: "open-chat-room",
    storageBucket: "open-chat-room.appspot.com",
    messagingSenderId: "827536818421",
    appId: "1:827536818421:web:5da15f3a7096a76e9685bc",
    measurementId: "G-6YQSVT5P0B"
  };
  
  // Initialize Firebase
  const db = firebase.initializeApp(firebaseConfig);
  
  export default db;