import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  tracks: {}, // { playlistId: [track1, track2, ...] }
  isFetched: {}, // { playlistId: true/false }
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
      state.tracks[playlistId] = state.tracks[playlistId].filter(
        (t) => t.id !== trackId
      );
    },
  },
});

export const {
  setPlaylistTracks,
  clearPlaylistTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} = playlistTracksSlice.actions;

// Selectors
const selectPlaylistTracksState = (state) => state.playlistTracks;

export const selectTracksByPlaylistId = createSelector(
  [selectPlaylistTracksState, (_, playlistId) => playlistId],
  (playlistTracksState, playlistId) =>
    playlistTracksState.tracks[playlistId] || []
);

export const selectIsFetchedByPlaylistId = createSelector(
  [selectPlaylistTracksState, (_, playlistId) => playlistId],
  (playlistTracksState, playlistId) =>
    playlistTracksState.isFetched[playlistId] || false
);

export default playlistTracksSlice.reducer;
