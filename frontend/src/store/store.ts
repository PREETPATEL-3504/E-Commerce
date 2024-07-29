import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import ProduceList from "./reducers/productList";

export const store = configureStore({
  reducer: {
    users: userSlice,
    ProduceList: ProduceList
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;