import { createSlice } from "@reduxjs/toolkit";

const playbackSlice = createSlice({
  name: "playback",
  initialState: {
    isPlaying: false,
    currentSong: null,
    progress: 0,
  },
  reducers: {}
});

export default playbackSlice.reducer;
