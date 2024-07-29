import { useDispatch } from "react-redux";
import { setSocket } from "../store/reducers/userSlice";
import { io } from "socket.io-client";
import { useEffect } from "react";

const ENDPOINT = "http://localhost:5000";

export const ConnectSocket = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");

  console.log("==========================================")

  useEffect(() => {
    if (id) {
      const connectSocket1 = () => {
        const socket = io(ENDPOINT);
        dispatch(setSocket(socket));

        return () => {
          socket.disconnect();
        };
      };
      connectSocket1();
    }
  }, [id, dispatch]);

  return;
};
