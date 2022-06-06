import React from 'react';
import { Link } from 'react-router-dom';

export default function Error(props) {
  return (
    <div>
      <h1>Error {props.code}</h1>
      <h3>{props.msg}</h3>
      <Link to="/">Take me home!</Link>
    </div>
  );
}
