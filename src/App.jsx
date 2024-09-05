import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppNav from "./AppNav";
import { AuthProvider, useAuth } from "../Context"; // Ensure correct import path
import { SocketProvider } from "../SocketProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <SocketProvider>
        <AppNav />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
