import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    items: [],
    isFetched: false,
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.items = action.payload;
      state.isFetched = true;
    },

    clearPlaylists: (state) => {
      state.items = [];
      state.isFetched = false;
    },
  },
});

export const { setPlaylists, clearPlaylists } = playlistSlice.actions;

export default playlistSlice.reducer;
