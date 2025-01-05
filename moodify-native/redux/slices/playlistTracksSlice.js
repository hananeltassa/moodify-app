import { createSlice } from "@reduxjs/toolkit";

const playlistTracksSlice = createSlice({
  name: "playlistTracks",
  initialState: {
    tracks: {},
    isFetched: {},
  },
  reducers: {
    setPlaylistTracks: (state, action) => {
      const { playlistId, tracks } = action.payload;
      state.tracks[playlistId] = tracks;
      state.isFetched[playlistId] = true;
    },
    clearPlaylistTracks: (state) => {
      state.tracks = {};
      state.isFetched = {};
    },
  },
});

export const { setPlaylistTracks, clearPlaylistTracks } = playlistTracksSlice.actions;

export default playlistTracksSlice.reducer;
