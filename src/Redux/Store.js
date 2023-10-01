/** @format */

import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usersReducer } from "./Auth/AuthSlice";

const persistConfig = {
  key: "users",
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, usersReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export default { store, persistor };
