import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmGG9w6eXnBBEMjYoFyr05KnBHJ0rf9nI",
  authDomain: "the-task-manager-app.firebaseapp.com",
  projectId: "the-task-manager-app",
  storageBucket: "the-task-manager-app.appspot.com",
  messagingSenderId: "478891779231",
  appId: "1:478891779231:web:3fb974da0b9ee4d3e06eaa",
  measurementId: "G-MMC1CP8H30",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
