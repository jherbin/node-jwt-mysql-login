import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useState } from 'react';
import AuthService from './services/AuthService';
import SecretRoute from './pages/SecretRoute';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [loginMsg, setLoginMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate('/');

  const [secretContent, setSecretContent] = useState('');

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
      setIsLoggedIn(true);
      const secret = await AuthService.getSecretContent();
      setSecretContent(secret);
      window.localStorage.setItem('token', token);
      navigate('/', { replace: true });
    } catch (error) {
      setLoginMsg(error.response.data.msg);
    }
  };

  const logout = () => {
    setToken('');
    setUser({});
    setIsLoggedIn(false);
    window.localStorage.clear();
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/sign-up">Sign Up</Link>}
        <Link to="/secret-route">Secret Route</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home token={token} user={user} logout={logout} />}
        />
        <Route path="login" element={<Login msg={loginMsg} login={login} />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="secret-route"
          element={<SecretRoute secretContent={secretContent} />}
        />
      </Routes>
    </div>
  );
}

export default App;
