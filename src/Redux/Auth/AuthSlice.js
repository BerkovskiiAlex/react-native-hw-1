/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk, loginThunk } from "./operations";

const initialState = {
  users: [],
  isLoggedIn: false,
  currentUser: "",
  errMessage: "",
};

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.users = payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
        console.log(payload);
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.users = payload;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
        console.log(payload);
      });
  },
});

export const { logout } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
