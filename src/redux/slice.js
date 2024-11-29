import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null, // Initial state for user details
  isAuthenticated: false, // Initial authentication state
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload; // Set user details
      state.isAuthenticated = true; // Set authenticated state to true
    },
    clearUser: (state) => {
      state.userDetails = null; // Clear user details
      state.isAuthenticated = false; // Set authenticated state to false
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;