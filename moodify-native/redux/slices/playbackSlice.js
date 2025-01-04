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
    stopPlayback: (state) => {
      state.isPlaying = false;
      state.progress = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { playSong, pauseSong, stopPlayback, togglePlayPause, updateProgress } = playbackSlice.actions;
export default playbackSlice.reducer;