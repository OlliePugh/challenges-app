import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User as FirebaseUser, UserInfo } from "firebase/auth";
import { auth } from "../../firebase/firebase";

type User = Pick<FirebaseUser, "displayName" | "email" | "uid">;

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

interface UserPayload {
  user: UserInfo;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserPayload>) => {
      const newUser: User = (({ displayName, email, uid }) => ({
        displayName,
        email,
        uid,
      }))(action.payload.user);
      state.user = newUser;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
