// SocketContext.js
import React, { createContext, useContext } from "react";
import socket from "./Socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
