import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import produceList from "./reducers/productList";

export const store = configureStore({
  reducer: {
    users: userSlice,
    produceList: produceList
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;