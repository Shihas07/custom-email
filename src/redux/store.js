
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice"; 


const store = configureStore({
  reducer: {
    user: userReducer, // Register the user slice reducer
  },
});

export default store;
