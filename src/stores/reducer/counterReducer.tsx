import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
