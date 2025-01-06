import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tracks: {},
  isFetched: {},
};

const playlistTracksSlice = createSlice({
  name: "playlistTracks",
  initialState,
  reducers: {
    setPlaylistTracks: (state, action) => {
      const { playlistId, tracks } = action.payload;
      state.tracks[playlistId] = tracks;
      state.isFetched[playlistId] = true;
    },
    clearPlaylistTracks: (state, action) => {
      const playlistId = action.payload;
      delete state.tracks[playlistId];
      state.isFetched[playlistId] = false;
    },
    addTrackToPlaylist: (state, action) => {
      const { playlistId, track } = action.payload;
      if (!state.tracks[playlistId]) state.tracks[playlistId] = [];
      state.tracks[playlistId].push(track);
    },
    removeTrackFromPlaylist: (state, action) => {
      const { playlistId, trackId } = action.payload;
      state.tracks[playlistId] = state.tracks[playlistId].filter((t) => t.id !== trackId);
    },
  },
});

export const {
  setPlaylistTracks,
  clearPlaylistTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} = playlistTracksSlice.actions;

export default playlistTracksSlice.reducer;
