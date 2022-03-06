import { initializeApp } from 'firebase/app';
import { getAuth, signOut, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, collection, connectFirestoreEmulator } from 'firebase/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
}

const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);
export const logout = () => signOut(auth);

export const db = getFirestore(app);
export const getUsersCollection = () => collection(db, 'users');
export const getListsCollection = () => collection(db, 'lists');
export const getItemsCollection = () => collection(db, 'items');


if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, 'http://localhost:8080', { disableWarnings: true });
}

if (process.env.NODE_ENV === 'test') {
  if (!process.env.IS_FIREBASE_CLI) {
    throw Error('CANNOT RUN TESTS USING FIREBASE CLOUD');
  }
} else {
  if (app.name) {
    console.log(
      'Firebase activated!',
      process.env.NODE_ENV !== 'production' && !process.env.IS_FIREBASE_CLI
        ? 'BE CAREFUL! YOU ARE USING FIREBASE CLOUD'
        : ''
    );
  } else {
    console.log('Firebase not working :(');
  }
}
