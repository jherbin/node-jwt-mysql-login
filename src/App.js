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
  const [user, setUser] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate('/');

  const login = async (username, password, email) => {
    try {
      const credentials = {
        username: username,
        email: email,
        password: password,
      };
      const response = await AuthService.login(credentials);
      setLoginMsg(response.msg);
      setToken(response.token);
      setUser(response.user);
      setIsLoggedIn(true);

      window.localStorage.setItem('token', response.token);
      navigate('/secret-route', { replace: true });
    } catch (error) {
      console.log(error);
      setLoginMsg(error.response.data.msg);
    }
  };

  const logout = () => {
    setToken('');
    setUser('');
    setIsLoggedIn(false);
    window.localStorage.clear();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/sign-up">Sign Up</Link>}
        {isLoggedIn && <Link to="/secret-route">Secret Route</Link>}
        {isLoggedIn && <span onClick={logout}>Logout</span>}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home token={token} user={user} isLoggedIn={isLoggedIn} />}
        />
        <Route path="login" element={<Login msg={loginMsg} login={login} />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="secret-route" element={<SecretRoute token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
