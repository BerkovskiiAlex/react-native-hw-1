/** @format */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user.email;
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

// /** @format */

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../Firebase/config";

// const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

// const loginDB = async ({ email, password }) => {
//   try {
//     const credentials = await signInWithEmailAndPassword(auth, email, password);
//     return credentials.user;
//   } catch (error) {
//     throw error;
//   }
// };

// const updateUserProfile = async (update) => {
//   const user = auth.currentUser;

//   if (user) {
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
