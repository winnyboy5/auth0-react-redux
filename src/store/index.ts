import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Setup Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // auth state
  },
});

// TS types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 