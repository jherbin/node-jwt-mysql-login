import React from 'react';

export default function Home(props) {
  return (
    <div>
      <h1>Hi {props.user.username}</h1>
    </div>
  );
}
