import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
    key:"user",
    storage,
    whitelist:["isAuthenticated"]
}

const persistedUserReducer = persistReducer(userPersistConfig,userReducer);

export const store = configureStore({
    reducer:{
        user:persistedUserReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export const persistor = persistStore(store);
export default store;
