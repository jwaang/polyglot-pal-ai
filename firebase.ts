import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOcuR5i0qNp64vNdGx1vGAhRVOHNsGouw",
  authDomain: "chatgpt-messenger-77722.firebaseapp.com",
  projectId: "chatgpt-messenger-77722",
  storageBucket: "chatgpt-messenger-77722.appspot.com",
  messagingSenderId: "17807532631",
  appId: "1:17807532631:web:b9e3d7294b2887d22b7912",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
