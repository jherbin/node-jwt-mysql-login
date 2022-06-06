import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import Error from './Error';

export default function SecretRoute(props) {
  const [secretContent, setSecretContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AuthService.getSecretContent(props.token)
      .then(setSecretContent)
      .catch(setError);
  }, [props.token]);

  return (
    <div>
      {error ? (
        <Error msg={error.response.data.msg} code={error.response.status} />
      ) : (
        <div> {secretContent}</div>
      )}
    </div>
  );
}
