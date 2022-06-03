import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

export default function SecretRoute(props) {
  const [secretContent, setSecretContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      console.log(props.token);
      AuthService.getSecretContent(props.token).then(setSecretContent);
    } catch (err) {
      console.log(err.response.data.msg);
      setError(err.response.data.msg);
    }
  }, [props.token]);

  return (
    <div>
      {secretContent}
      {error}
    </div>
  );
}
