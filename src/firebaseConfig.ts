import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCdFj2loINMT6XV_LmncrHAGwvQMcXLi98",
  authDomain: "casewise-be8e6.firebaseapp.com",
  projectId: "casewise-be8e6",
  storageBucket: "casewise-be8e6.firebasestorage.app",
  messagingSenderId: "559942683406",
  appId: "1:559942683406:web:e7a543dfd036c36c9e655f",
  measurementId: "G-E6L0NLPWCT"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);