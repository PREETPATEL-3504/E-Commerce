import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: any;
  socket: any;
}

const initialState: User = {
  user: [],
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    disconnectSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setUser, setSocket, disconnectSocket } = userSlice.actions;
export default userSlice.reducer;
