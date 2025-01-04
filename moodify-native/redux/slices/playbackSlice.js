import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentSong: null,
  progress: 0,
};

const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    stopPlayback: (state) => {
      state.isPlaying = false;
      state.progress = 0;
    },
  },
});

export const { playSong, togglePlayPause, updateProgress, stopPlayback } = playbackSlice.actions;

export default playbackSlice.reducer;
