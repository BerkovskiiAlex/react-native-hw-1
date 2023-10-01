/** @format */

export const getLoggedIn = (state) => {
  return state.isLoggedIn;
};

export const getRegistrationSuccess = (state) => {
  return state.registrationSuccess;
};

export const getPosts = (state) => {
  return state.posts;
};

export const getPostsUpdate = (state) => {
  return state.isPostsUpdate;
};

export const getCurrentUser = (state) => {
  return state.currentUser;
};