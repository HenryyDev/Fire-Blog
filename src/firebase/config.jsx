import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fireblog-1fb91.firebaseapp.com",
  projectId: "fireblog-1fb91",
  storageBucket: "fireblog-1fb91.firebasestorage.app",
  messagingSenderId: "72576148145",
  appId: "1:72576148145:web:803799b557349650047890",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
