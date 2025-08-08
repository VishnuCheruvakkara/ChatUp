import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Transform: persist only isAuthenticated field
const saveSubsetFilter = createTransform(
  (inboundState, key) => {
    return { isAuthenticated: inboundState.isAuthenticated };
  },
  (outboundState, key) => {
    return {
      isAuthenticated: outboundState.isAuthenticated ?? false,
      userData: null,
    };
  },
  { whitelist: ["user"] }
);

const userPersistConfig = {
  key: "user",
  storage,
  transforms: [saveSubsetFilter],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
