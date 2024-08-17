import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AppNav from './AppNav';
import { AuthProvider, useAuth } from '../Context'; // Ensure correct import path

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
