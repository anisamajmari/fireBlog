import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYi91ZybsP_GJwfTvx0c5gtagw99CLFN4',
  authDomain: 'fireblog-34b46.firebaseapp.com',
  projectId: 'fireblog-34b46',
  storageBucket: 'fireblog-34b46.appspot.com',
  messagingSenderId: '355786085927',
  appId: '1:355786085927:web:cc9be3f0b4e63ac3716002',
  measurementId: 'G-C63FPXV4PK'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore
