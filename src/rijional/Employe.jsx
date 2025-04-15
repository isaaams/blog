import React from 'react';
import styles from './Employe.css';

const Employe = ({ image, nom }) => {
  return (
    <div className={styles.employe}>
      <img src={image} alt={nom} />
      <p>{nom}</p>
    </div>
  );
};

export default Employe;