import React, { useEffect, useState } from 'react';

const EmployeesApi = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://www.ofppt.ma/api/employes')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Erreur lors du chargement des employés:', error));
  }, []);

  return (
    <div>
      {employees.length > 0 ? (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              <img src={emp.image} alt={emp.nom} />
              <p>{emp.nom}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des employés...</p>
      )}
    </div>
  );
};

export default EmployeesApi;