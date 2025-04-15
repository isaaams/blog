
import React, { useState } from 'react';

function Login({ setLoggedIn, setUser }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!login || !password) {
      setError('Veuillez saisir un login et un mot de passe');
    } else if (login !== 'admin' || password !== '1234') { // Example of a correct login/password check
      setError('Erreur de login/mot de passe');
    } else {
      setError('');
      setUser(login);
      setLoggedIn(true);
    }
  };

  return (
    <div>
      <h2>Authentification</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de Passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>S'authentifier</button>
    </div>
  );
}

export default Login;
