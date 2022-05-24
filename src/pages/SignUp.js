import React, { useState } from 'react';
import AuthService from '../services/AuthService';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [msg, setMsg] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        username: username,
        password: password,
        password_repeat: passwordRepeat,
      };
      const response = await AuthService.signUp(credentials);
      setMsg(response.msg);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRepeatPasswordChange = (e) => {
    setPasswordRepeat(e.target.value);
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h1>Sign Up</h1>
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
        <input
          type="password"
          placeholder="Password (Repeat)"
          name="passwordRepeat"
          value={passwordRepeat}
          onChange={handleRepeatPasswordChange}
        />
        <input type="submit" value="Sign Up" />
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
