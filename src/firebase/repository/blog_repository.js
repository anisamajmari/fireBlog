import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseInit.js';

export async function addBlog(
  blogHTML,
  blogCoverPhoto,
  blogCoverPhotoName,
  blogTitle,
  profileId,
  timestamp
) {
  const docRef = collection(db, 'blogPosts');
  return await addDoc(docRef, {
    blogId: docRef.id,
    blogHTML: blogHTML,
    blogCoverPhoto: blogCoverPhoto,
    blogCoverPhotoName: blogCoverPhotoName,
    blogTitle: blogTitle,
    profileId: profileId,
    date: timestamp
  });
}
