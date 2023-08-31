import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { getToken } from './utils';
import Game from './game';
import Login from './login';
import './App.css';

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  useEffect (() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={
            isAuthenticated
            ? <Navigate to="/game" />
            : <Login onLogin={handleLogin}/> 
          }
        />
        <Route
          path="/game"
          element={
            isAuthenticated
            ? <Game />
            : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
