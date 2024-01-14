import { UserInfo, onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import { logIn, logOut } from "../../redux/slices/userSlice";

const AuthListener = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(
        user != null ? logIn({ user: user.toJSON() as UserInfo }) : logOut()
      );
    });
  }, []);

  return children;
};
export default AuthListener;
