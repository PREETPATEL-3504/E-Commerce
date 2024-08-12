import { useDispatch } from "react-redux";
import { setSocket } from "../store/reducers/userSlice";
import { io } from "socket.io-client";
import { useEffect } from "react";

const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export const ConnectSocket = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");


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
