import { initializeApp } from 'firebase/app';
import { FieldValue } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDYi91ZybsP_GJwfTvx0c5gtagw99CLFN4',
  authDomain: 'fireblog-34b46.firebaseapp.com',
  projectId: 'fireblog-34b46',
  storageBucket: 'fireblog-34b46.appspot.com',
  messagingSenderId: '355786085927',
  appId: '1:355786085927:web:cc9be3f0b4e63ac3716002',
  measurementId: 'G-C63FPXV4PK'
};

const firebaseApp = initializeApp(firebaseConfig);
const timestamp = FieldValue.serverTimestamp;
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { timestamp, db, auth };
export default firebaseApp;
