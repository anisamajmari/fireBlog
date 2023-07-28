import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseInit.js';

export async function addUser(firstName, lastName, username, email) {
  await addDoc(collection(db, 'users'), {
    firstName: firstName,
    lastname: lastName,
    username: username,
    email: email
  });
}
