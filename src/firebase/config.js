import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkj6xvjDM4drua_VhTZg7BdgZvTPZVRmY",
  authDomain: "reactdemo9001991222311.firebaseapp.com",
  projectId: "reactdemo9001991222311",
  storageBucket: "reactdemo9001991222311.firebasestorage.app",
  messagingSenderId: "1023290713181",
  appId: "1:1023290713181:web:453018589eddff4b06d9b4",
  measurementId: "G-6ZGQFYX3LQ"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}