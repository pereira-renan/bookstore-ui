import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: () => true,
    loggoutUser: () => false,
  },
});

export const { loginUser, loggoutUser } = authSlice.actions;

export default authSlice.reducer;
