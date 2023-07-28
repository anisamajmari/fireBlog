import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseInit.js';

export async function createFirebaseUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function userSignIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
