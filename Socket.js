import { io } from "socket.io-client";
const userId = localStorage.getItem("userId");
const socket = io.connect("http://localhost:8000", {
  withCredentials: true,
  query: {
    userId: userId,
  },
});
export default socket;
