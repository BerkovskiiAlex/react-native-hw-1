/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginThunk,
  addPostThunk,
  getDataFromFirestoreThunk,
  addCommentThunk,
} from "./operations";

const initialState = {
  users: [],
  isLoggedIn: false,
  currentUser: {},
  errMessage: "",
  posts: [],
  isPostsUpdate: false,
};

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.currentUser = {
          email: payload.email,
          displayName: payload.displayName,
          uid: payload.uid,
        };
        state.isLoggedIn = true;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
        console.log(payload);
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.currentUser = {
          email: payload.email,
          displayName: payload.displayName,
          uid: payload.uid,
        };
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
        console.log(payload);
      })
      .addCase(addPostThunk.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts];
        state.isPostsUpdate = false;
      })
      .addCase(addPostThunk.pending, (state, { payload }) => {
        state.isPostsUpdate = true;
      })
      .addCase(addPostThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      })
      .addCase(getDataFromFirestoreThunk.fulfilled, (state, { payload }) => {
        state.posts = [...payload];
      })
      .addCase(getDataFromFirestoreThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      })
      .addCase(addCommentThunk.fulfilled, (state, { payload }) => {
        state.isPostsUpdate = false;
      })
      .addCase(addCommentThunk.pending, (state, { payload }) => {
        state.isPostsUpdate = true;
      })
      .addCase(addCommentThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      });
  },
});

export const { logout } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
