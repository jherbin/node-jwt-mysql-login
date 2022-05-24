import React, { useState } from 'react';
import AuthService from '../services/AuthService';

export default function Login() {
  const [username, setUsername] = useState('');
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    this.props.login(username, password);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
