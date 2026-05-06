import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  measurementId?: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
};

export const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.appId &&
    firebaseConfig.authDomain &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket,
);

const firebaseApp: FirebaseApp | undefined = hasFirebaseConfig
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : undefined;

export const firestoreDb: Firestore | undefined = firebaseApp
  ? getFirestore(firebaseApp)
  : undefined;

export const firebaseAuth: Auth | undefined = firebaseApp ? getAuth(firebaseApp) : undefined;
