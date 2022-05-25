import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useState } from 'react';
import AuthService from './services/AuthService';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [loginMsg, setLoginMsg] = useState('');

  const getDefaultState = () => {
    setToken('');
    setUser({});
  };

  const login = async (username, password) => {
    try {
      const credentials = {
        username: username,
        password: password,
      };
      const response = await AuthService.login(credentials);
      console.log(response);
      setLoginMsg(response.msg);
      setToken(response.token);
      setUser(response.user);
      //this.$router.push('/');
    } catch (error) {
      setLoginMsg(error.response.data.msg);
    }
  };

  const logout = () => {
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
        <Route
          path="/"
          element={<Home token={token} user={user} logout={logout} />}
        />
        <Route path="login" element={<Login msg={loginMsg} login={login} />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
