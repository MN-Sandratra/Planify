import { configureStore } from "@reduxjs/toolkit";
import authentificationSlice from "../src/_slice/authentification/authentification.slice";

export const store = configureStore({
  reducer: {
    authentification: authentificationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
