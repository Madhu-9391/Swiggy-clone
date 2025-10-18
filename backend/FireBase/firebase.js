import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "swiggy-authenticate-firebase.firebaseapp.com",
  projectId: "swiggy-authenticate-firebase",
  storageBucket: "swiggy-authenticate-firebase.firebasestorage.app",
  messagingSenderId: "544851200009",
  appId: "1:544851200009:web:8ab0402a8d3a5cf6fe90d8",
  measurementId: "G-J5R37MZ6GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const analytics = getAnalytics(app);
export {app,auth};