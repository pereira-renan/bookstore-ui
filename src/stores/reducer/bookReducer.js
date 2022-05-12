import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const bookReducer = createSlice({
  name: 'bookData',
  initialState,
  reducers: {
    setBookData: (state, action) => {
      const payload = action.payload;
      state.value = payload;
    },
    eraseBookData: (state) => {
      state.value = initialState;
    },
  },
});

export const { setBookData, eraseBookData } = bookReducer.actions;
export default bookReducer.reducer;
