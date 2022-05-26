import React from 'react';

export default function Home(props) {
  const handleLogout = () => {
    props.logout();
  };

  return (
    <div>
      <h1>Hi {props.user.username}</h1>
      <p></p>
      <input type="button" value="Logout" onClick={handleLogout} />
    </div>
  );
}
