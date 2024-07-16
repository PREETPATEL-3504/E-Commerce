import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/UserSlice";
import ProduceList from "./Reducers/ProduceList";

export const store = configureStore({
  reducer: {
    users: userSlice,
    ProduceList: ProduceList
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;