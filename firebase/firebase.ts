import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfBrPfj9qmem8g10nVhFnJYSS-YIewIR4",
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
