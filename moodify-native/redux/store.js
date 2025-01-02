import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import playlistReducer from './slices/playlistSlice';
import playlistTracksReducer from "./slices/playlistTracksSlice";
import playbackReducer from "./slices/playbackSlice";

const store = configureStore({
    reducer: {
      user: userReducer,
      playlists: playlistReducer,
      playlistTracks: playlistTracksReducer,
      playback: playbackReducer,
    },
});
  
export default store;