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
    stopSong: (state) => {
      state.isPlaying = false;
      state.currentSong = null;
      state.progress = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { playSong, pauseSong, stopSong, togglePlayPause } = playbackSlice.actions;
export default playbackSlice.reducer;