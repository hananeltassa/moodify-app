import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload;
      },
    },
});
  