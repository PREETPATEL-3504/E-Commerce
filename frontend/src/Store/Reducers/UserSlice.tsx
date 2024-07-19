import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  socket: any;
}

const initialState: User = {
  name: "",
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setName, setSocket } = userSlice.actions;
export default userSlice.reducer;
