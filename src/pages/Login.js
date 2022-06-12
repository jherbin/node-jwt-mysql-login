import React, { useState } from 'react';

export default function Login(props) {
  const [loginString, setLoginString] = useState('');
  const handleLoginStringChange = (e) => {
    setLoginString(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const usesUsername = (string) => {
      if (string.length > 0) {
        return /^[A-Za-z0-9]*$/.test(string);
      }
    };

    if (usesUsername(loginString)) {
      //uses username
      props.login(loginString, password, '');
    } else {
      //uses email
      props.login('', password, loginString);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username or Email"
          name="loginString"
          value={loginString}
          onChange={handleLoginStringChange}
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
