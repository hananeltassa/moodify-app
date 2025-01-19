import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mood: null,
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setMood: (state, action) => {
      state.mood = action.payload;
      state.AIdescription = action.payload.AIdescription || '';
    },
    clearMood: (state) => {
      state.mood = null;
      state.AIdescription = '';
    },
  },
});

export const { setMood, clearMood } = moodSlice.actions;

export default moodSlice.reducer;
