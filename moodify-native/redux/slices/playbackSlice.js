import { createSlice } from "@reduxjs/toolkit";

const playbackSlice = createSlice({
  name: "playback",
  initialState: {
    isPlaying: false,
    currentSong: null,
    progress: 0,
    soundInstance: null, // Add soundInstance to manage Audio.Sound
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
    stopPlayback: (state) => {
      state.isPlaying = false;
      state.soundInstance = null; // Clear soundInstance
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    setSoundInstance: (state, action) => {
      state.soundInstance = action.payload; // Set the active Audio.Sound instance
    },
  },
});

export const {
  playSong,
  pauseSong,
  stopSong,
  stopPlayback,
  togglePlayPause,
  updateProgress,
  setSoundInstance,
} = playbackSlice.actions;

export default playbackSlice.reducer;
