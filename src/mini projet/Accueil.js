import React from 'react';
import ListeProduit from './ListeProduit';

function Accueil({ user }) {
  return (
    <div>
      <h1>Bienvenue {user}</h1>
      <ListeProduit />
    </div>
  );
}

export default Accueil;