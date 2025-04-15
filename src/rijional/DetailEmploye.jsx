import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailEmploye = () => {
  const { nom } = useParams();
  const employee = useSelector((state) => state.employees.find((emp) => emp.nom === nom));

  return (
    <div>
      {employee && (
        <div>
          <img src={employee.image} alt={employee.nom} />
          <h2>{employee.nom} {employee.prenom}</h2>
          <p>{employee.fonction}</p>
        </div>
      )}
    </div>
  );
};

export default DetailEmploye;