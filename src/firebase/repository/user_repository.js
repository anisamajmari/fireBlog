import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
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

export async function updateUser(id, firstName, lastName, username) {
  const userDoc = await findUser(id);
  const docRef = doc(db, 'users', userDoc.id);
  await setDoc(
    docRef,
    {
      firstName: firstName,
      lastName: lastName,
      username: username
    },
    { merge: true }
  );
  return userDoc;
}
