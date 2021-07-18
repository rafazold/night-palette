import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  measurementId: process.env.MEASUREMENT_ID,
  appId: process.env.APP_ID,
};

export const firebase = app.initializeApp(firebaseConfig);
app.analytics();
export const googleProvider = app.auth.GoogleAuthProvider.PROVIDER_ID;
export const emailProvider = app.auth.EmailAuthProvider.PROVIDER_ID;
