
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBXqQluwjB1Qipws6yWJhXsq0XBvutQ7zQ",

  authDomain: "magdalena-food-tracker.firebaseapp.com",

  projectId: "magdalena-food-tracker",

  storageBucket: "magdalena-food-tracker.firebasestorage.app",

  messagingSenderId: "208918807918",

  appId: "1:208918807918:web:0111206b4b854b908ead7f",

  measurementId: "G-93YXWD4JRL"

};



const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);