import { Stack } from "expo-router/stack";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/state/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { logIn, logOut } from "../redux/slices/userSlice";
import AuthListener from "../components/AuthListener";

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthListener>
        <Stack />
      </AuthListener>
    </Provider>
  );
}
