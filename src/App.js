import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const getDefaultState = () => {
    setToken('');
    setUser({});
  };

  const logIn = (user, token) => {
    setUser(user);
    setToken(token);
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logOut = () => {
    getDefaultState();
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
