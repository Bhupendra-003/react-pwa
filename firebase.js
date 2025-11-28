// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlae9m_PKPks8KLcfQlaQZgEoCjMnh49E",
    authDomain: "concat-7fcf9.firebaseapp.com",
    projectId: "concat-7fcf9",
    storageBucket: "concat-7fcf9.firebasestorage.app",
    messagingSenderId: "13505970033",
    appId: "1:13505970033:web:933e7c670ad3e4d2a240d0",
    measurementId: "G-DQDC9H2NFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);