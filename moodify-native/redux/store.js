import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import playlistReducer from './slices/playlistSlice';
import playlistTracksReducer from "./slices/playlistTracksSlice";

const store = configureStore({
    reducer: {
      user: userReducer,
      playlists: playlistReducer,
      playlistTracks: playlistTracksReducer,
    },
});
  
export default store;