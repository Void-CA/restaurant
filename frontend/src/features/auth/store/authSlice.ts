import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setAuthenticated, setUser, setLoggedOut } = authSlice.actions;
export default authSlice.reducer; 