import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import FileSystem from "expo-file-system";
import { RootState } from "../state/store";
import { Buffer } from "buffer";

interface ChallengeVideoState {
  videos: string[];
}

const initialState: ChallengeVideoState = {
  videos: [],
};

export const uploadVideos =
  (): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch, getState) => {
    console.log("uploading videos");
    for (const uri of getState().challengeVideo.videos) {
      console.log(uri);
      const buffer = Buffer.from(
        await FileSystem.readAsStringAsync(uri),
        "base64"
      );
      console.log(buffer.length);
    }
    console.log("converted all items");
    dispatch({ type: "challengeVideo/clearVideos" });
  };

const challengeVideoSlice = createSlice({
  name: "challengeVideo",
  initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<{ video: string }>) => {
      state.videos = [...state.videos, action.payload.video];
    },
    clearVideos: (state) => {
      state.videos = [];
    },
  },
});

export const { addVideo } = challengeVideoSlice.actions;

export default challengeVideoSlice.reducer;
