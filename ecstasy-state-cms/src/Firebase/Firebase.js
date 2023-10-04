import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    projectId: "ecstasy-state",
    storageBucket: "ecstasy-state.appspot.com",
    messagingSenderId: "1060291713441",
    appId: "1:1060291713441:web:6bf85cf7139080b51c93e0",
    measurementId: "G-P5H7PYT03N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }