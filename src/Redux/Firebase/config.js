/** @format */

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyATvVcNF-Qi1fDuspVjAzZMtU3cfTxggHg",
  authDomain: "snappy-attic-400215.firebaseapp.com",
  projectId: "snappy-attic-400215",
  storageBucket: "snappy-attic-400215.appspot.com",
  messagingSenderId: "406898186641",
  appId: "1:406898186641:web:d2d16025393a7a25842230",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
