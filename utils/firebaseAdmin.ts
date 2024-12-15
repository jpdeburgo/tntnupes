import admin from "firebase-admin";
import { firebaseAdminSDKConfig } from "./config";

// Avoid reinitializing if already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseAdminSDKConfig.project_id,
      clientEmail: firebaseAdminSDKConfig.client_email,
      privateKey: firebaseAdminSDKConfig.private_key.replace(/\\n/g, "\n"),
    }),
    databaseURL: firebaseAdminSDKConfig.databaseURL,
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export default admin;
