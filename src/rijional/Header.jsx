import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Liste des employés</Link>
          </li>
          <li>
            <Link to="/add">Ajouter un employé</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;