import { initializeApp, getApps, getApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app); // Initialize Firestore
export const auth = getAuth(app);
export default app;
