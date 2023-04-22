// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyC9DKQlp5IwjAKJZPjHu-p-XZId61MEl9Q",
//   authDomain: "monkey-blogging.firebaseapp.com",
//   projectId: "monkey-blogging",
//   storageBucket: "monkey-blogging.appspot.com",
//   messagingSenderId: "483024495358",
//   appId: "1:483024495358:web:483098406a1e3d6816fbaf",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCe9o6OUwFVuJHOQjERMPmI1aNCMAMJIAc',
  authDomain: 'monkeyblog-b2e38.firebaseapp.com',
  projectId: 'monkeyblog-b2e38',
  storageBucket: 'monkeyblog-b2e38.appspot.com',
  messagingSenderId: '5111928258',
  appId: '1:5111928258:web:dbc2ef511bec92eb0e725b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
