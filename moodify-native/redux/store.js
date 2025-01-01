import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import playlistReducer from './slices/playlistSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      playlists: playlistReducer,
    },
});
  
export default store;