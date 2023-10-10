/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginThunk,
  addPostThunk,
  getDataFromFirestoreThunk,
  addCommentThunk,
  getSinglePostThunk,
} from "./operations";

const initialState = {
  users: [],
  isLoggedIn: false,
  currentUser: {},
  errMessage: "",
  posts: [],
  isPostsUpdate: true,
  singlePost: {},
};

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = [];
      state.posts = [];
      state.singlePost = {};
      state.errMessage = "";
    },
    clearErrorMessage: (state) => {
      state.errMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = {
          email: payload.email,
          displayName: payload.displayName,
          uid: payload.uid,
        };
        state.isLoggedIn = true;
        state.errMessage = "";
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.currentUser = {
          email: payload.email,
          displayName: payload.displayName,
          uid: payload.uid,
        };
        state.isLoggedIn = true;
        state.errMessage = "";
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
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
        state.isPostsUpdate = true;
      })
      .addCase(addCommentThunk.pending, (state, { payload }) => {
        state.isPostsUpdate = false;
      })
      .addCase(addCommentThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      })
      .addCase(getSinglePostThunk.fulfilled, (state, { payload }) => {
        state.singlePost = payload;
        state.isPostsUpdate = false;
      })
      .addCase(getSinglePostThunk.pending, (state, { payload }) => {
        state.isPostsUpdate = true;
      })
      .addCase(getSinglePostThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      });
  },
});

export const { logout, clearErrorMessage } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
