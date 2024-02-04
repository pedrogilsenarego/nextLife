import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataSlice } from "./data";

const persistConfig = {
  key: "rootsasas",
  storage,
};

const rootReducer = combineReducers({ DataSlice: DataSlice.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
