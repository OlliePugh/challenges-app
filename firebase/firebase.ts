import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "challenges-8d7aa.firebaseapp.com",
  projectId: "challenges-8d7aa",
  storageBucket: "challenges-8d7aa.appspot.com",
  messagingSenderId: "590916272324",
  appId: "1:590916272324:web:42e7335626518ec1658991",
  measurementId: "G-VD6NDES10E",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);
if (process.env.NODE_ENV === "development") {
  connectStorageEmulator(storage, "192.168.1.85", 9199);
}
