// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZT8qdIN7MIboZlnWWBs9g2EZCO5S44uk',
  authDomain: 'fir-demo-617fe.firebaseapp.com',
  projectId: 'fir-demo-617fe',
  storageBucket: 'fir-demo-617fe.appspot.com',
  messagingSenderId: '745407703413',
  appId: '1:745407703413:web:cd13a325e879efbf094b3c',
  measurementId: 'G-8XVZVK1WHE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//init services
export const db = getFirestore(app);
export const auth = getAuth(app);
