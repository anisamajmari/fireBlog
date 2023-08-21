import { collection, setDoc, orderBy, query, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebaseInit.js';

export async function addBlog(
  blogHTML,
  blogCoverPhoto,
  blogCoverPhotoName,
  blogTitle,
  profileId,
  timestamp
) {
  const docRef = doc(collection(db, 'blogPosts'));
  return await setDoc(
    docRef,
    {
      blogId: docRef.id,
      blogHTML: blogHTML,
      blogCoverPhoto: blogCoverPhoto,
      blogCoverPhotoName: blogCoverPhotoName,
      blogTitle: blogTitle,
      profileId: profileId,
      date: timestamp
    },
    { merge: true }
  );
}

export async function getBlog(state) {
  const docRef = collection(db, 'blogPosts');
  const q = query(docRef, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
      const data = {
        blogId: doc.data().blogId,
        blogHTML: doc.data().blogHTML,
        blogCoverPhoto: doc.data().blogCoverPhoto,
        blogTitle: doc.data().blogTitle,
        blogDate: doc.data().date
      };
      state.blogPosts.push(data);
    }
  });
}
