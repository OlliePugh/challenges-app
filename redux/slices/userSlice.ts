import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: string | null;
}

const initialState: UserState = {
  user: null,
};

interface UserPayload {
  user: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserPayload>) => {
      state.user = action.payload.user;
    },
  },
});

export const { logIn } = userSlice.actions;
