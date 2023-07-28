import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseInit.js';

export async function addUser({ firstName, lastName, username, email, id }) {
  await addDoc(collection(db, 'users'), {
    firstName: firstName,
    lastname: lastName,
    username: username,
    email: email,
    id: id
  });
}

export async function findUser(id) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0];
}
