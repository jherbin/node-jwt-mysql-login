import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

export default function SecretRoute(props) {
  const [secretContent, setSecretContent] = useState('');

  useEffect(() => {
    AuthService.getSecretContent(props.token).then(setSecretContent);
  }, [props.token]);

  return <div>{secretContent}</div>;
}
