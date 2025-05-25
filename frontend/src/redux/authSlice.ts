import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { setAuthenticated, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
