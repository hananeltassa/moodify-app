import { createSlice } from "@reduxjs/toolkit";

const playbackSlice = createSlice({
  name: "playback",
  initialState: {
    isPlaying: false,
    currentSong: null,
    progress: 0,
  },
  reducers: {
    playSong: (state, action) => {
      state.isPlaying = true;
      state.currentSong = action.payload;
      state.progress = 0;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { playSong, pauseSong } = playbackSlice.actions;
export default playbackSlice.reducer;