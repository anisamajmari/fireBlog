import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseInit.js';

export async function createFirebaseUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
