import app from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

export const firebase = app.initializeApp(firebaseConfig);
export const googleProvider = app.auth.GoogleAuthProvider.PROVIDER_ID;
export const emailProvider = app.auth.EmailAuthProvider.PROVIDER_ID;
// export default Firebase;
