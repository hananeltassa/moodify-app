import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'playlists',
    initialState: {
        items: [],
        isFetched: false,
    },
});

export default playlistSlice.reducer;