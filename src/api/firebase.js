import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyAcAb0dLnE6vokaYYsWHdasHyMMRKMnHvc",
  authDomain: "night-palette.firebaseapp.com",
  databaseURL: "https://night-palette-default-rtdb.firebaseio.com",
  projectId: "night-palette",
  storageBucket: "night-palette.appspot.com",
  messagingSenderId: "725795731806",
  appId: "1:725795731806:web:5b444fb39fd980fe1af7cf",
  measurementId: "G-7T4GPG3RWV"
};

export const firebase = app.initializeApp(firebaseConfig);
app.analytics();
export const googleProvider = app.auth.GoogleAuthProvider.PROVIDER_ID;
export const emailProvider = app.auth.EmailAuthProvider.PROVIDER_ID;
