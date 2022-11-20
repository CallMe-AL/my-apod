import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const key = process.env.REACT_APP_FIREBASE_KEY;
const app_id = process.env.REACT_APP_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: key,
  authDomain: "myapod-57a7a.firebaseapp.com",
  projectId: "myapod-57a7a",
  storageBucket: "myapod-57a7a.appspot.com",
  messagingSenderId: "536659241059",
  appId: app_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// set persistence (local, session, or none)
// use browserSessionPersistence for session storage instead
setPersistence(auth, browserLocalPersistence).catch(err => alert(err.message));

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };