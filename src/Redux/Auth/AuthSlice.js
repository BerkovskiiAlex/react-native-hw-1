/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "./operations";

const initialState = {
  users: [],
  isLoggedIn: false,
  errMessage: "",
};

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoggedIn = true;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.errMessage = payload;
      });
  },
});

export const {} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
