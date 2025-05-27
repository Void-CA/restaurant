// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
// importa otros reducers...

const store = configureStore({
  reducer: {
    auth: authReducer,
    // otros reducers...
  },
});

export default store;
