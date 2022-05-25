import React, { useState } from 'react';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    props.login(username, password);
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
        {props.msg && <p>{props.msg}</p>}
      </form>
    </div>
  );
}
