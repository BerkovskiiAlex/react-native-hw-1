/** @format */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase/config";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credentials.user, {
        displayName: username,
      });

      return credentials.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addPostThunk = createAsyncThunk(
  "posts/addPost",
  async ({ photoTitle, location, photoUrl, comments }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: photoTitle,
        location,
        photoUrl,
        comments,
        createdAt: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      return { ...{ photoTitle, location }, id: docRef.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDataFromFirestoreThunk = createAsyncThunk(
  "posts/getData",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const postsList = [];
      snapshot.forEach((doc) => {
        postsList.push({ postId: doc.id, post: doc.data() });
      });
      return postsList;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addCommentThunk = createAsyncThunk(
  "posts/addComment",
  async ({ commentText, uid, createdAt, postId }, { rejectWithValue }) => {
    const comment = { commentText, uid, createdAt };
    console.log(postId);
    try {
      const addedComment = await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion({ ...comment }),
      });

      return addedComment;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
