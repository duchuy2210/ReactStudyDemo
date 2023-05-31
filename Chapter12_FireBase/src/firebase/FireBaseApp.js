import { async } from '@firebase/util';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  getDoc,
  query,
  limit,
  orderBy,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';

const FireBaseApp = () => {
  const colRef = collection(db, 'posts');
  // console.log('colRef:', colRef);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // getDocs(colRef)
    //   .then(snapshot => {
    //     // console.log('snapshot:', snapshot);
    //     let posts = [];
    //     snapshot.forEach(element => {
    //       posts.push({
    //         id: element.id,
    //         ...element.data(),
    //       });
    //     });
    //     // console.log('posts:', posts);
    //     setPosts(posts);
    //   })
    //   .catch(err => {
    //     console.log('error:', err);
    //   });
    //2. Get document realtime using on Snapshot
    onSnapshot(colRef, snapshot => {
      let posts = [];
      snapshot.forEach(element => {
        posts.push({
          id: element.id,
          ...element.data(),
        });
      });
      // console.log('posts:', posts);
      setPosts(posts);
    });
    //fetching single doc
    const docRefSingle = doc(db, 'posts', 'f1aYCRrwcTJM8ApIU0iE');
    getDoc(docRefSingle).then(doc => {
      console.log(doc.id, doc.data());
    });
  }, []);
  const handleSubmitPost = e => {
    e.preventDefault();
    addDoc(colRef, {
      title: title,
      author: author,
      createAt: serverTimestamp(),
    })
      .then(console.log('submit success'))
      .catch(err => {
        console.log('error:', err);
      });
  };
  const handleRemovePost = async e => {
    e.preventDefault();
    const colRefDelete = doc(db, 'posts', idPost);
    await deleteDoc(colRefDelete);
    console.log('remove posts success');
  };
  useEffect(() => {
    const q = query(colRef, where('author', '==', 'Ngô Đức Huy'));
    onSnapshot(q, snapshot => {
      let posts = [];
      snapshot.docs.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log('posts:', posts);
    });
  }, []);
  return (
    <div>
      <div className="p-10">
        <div className="w-full max-w-[500px] shadow-lg bg-white mx-auto p-5 mb-10">
          {posts.length > 0 &&
            posts.map((post, index) => {
              return (
                <div key={index}>
                  {post.title} ~ {post.author}
                </div>
              );
            })}
        </div>
        <div className="w-full max-w-[500px] shadow-lg bg-white mx-auto p-5 mb-10">
          <h1 className="text-xl text-center mb-5 font-bold">Add New post</h1>
          <form onSubmit={handleSubmitPost}>
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-blue-500 mb-5"
              placeholder="Enter your title"
              name="title"
              onChange={e => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-blue-500 mb-5"
              placeholder="Enter your author"
              name="author"
              onChange={e => setAuthor(e.target.value)}
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg w-full">
              Add post
            </button>
          </form>
        </div>
        <div className="w-full max-w-[500px] shadow-lg bg-white mx-auto p-5 mb-10">
          <h1 className="text-xl text-center mb-5 font-bold">Remove post</h1>
          <form onSubmit={handleRemovePost}>
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-blue-500 mb-5"
              placeholder="Enter your Id post"
              name="idPost"
              onChange={e => setIdPost(e.target.value)}
            />
            <button
              type="submit"
              className="p-3 bg-red-500 text-white rounded-lg w-full">
              Remove post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FireBaseApp;
