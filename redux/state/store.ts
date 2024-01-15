import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import challengeVideoSlice from "../slices/challengeVideoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    challengeVideo: challengeVideoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
