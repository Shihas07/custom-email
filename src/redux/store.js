import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Apply persistReducer to userReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer, // Use persisted reducer for user slice
  },
});

// Create the persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
