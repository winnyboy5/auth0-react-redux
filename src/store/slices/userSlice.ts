import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Auth state type
interface UserState {
  isAuthenticated: boolean;
  user: {
    name?: string;      // name
    email?: string;     // email
    picture?: string;   // avatar
    sub?: string;       // user id
  } | null;
}

// Initial state - logged out
const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

// Auth slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Save user after login
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    
    // Clear on logout
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 