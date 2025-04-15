import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Employe from './Employe';
import styles from './listEmploye.css';

const ListEmploye = () => {
  const employees = useSelector((state) => state.employees);
  const navigate = useNavigate();

  return (
    <div className={styles.liste}>
      {employees.map((emp) => (
        <div key={emp.id} onClick={() => navigate(`/${emp.nom}`)}>
          <Employe image={emp.image} nom={emp.nom} />
        </div>
      ))}
    </div>
  );
};

export default ListEmploye;