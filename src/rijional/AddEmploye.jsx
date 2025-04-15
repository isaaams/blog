import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ajouterEmploye } from '../store';

const AddEmploye = () => {
  const [form, setForm] = useState({ image: '', nom: '', prenom: '', fonction: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(ajouterEmploye({ ...form, id: Date.now() }));
  };

  return (
    <div>
      <input type="text" name="image" placeholder="Lien de l'image" onChange={handleChange} />
      <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
      <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
      <input type="text" name="fonction" placeholder="Fonction" onChange={handleChange} />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
};
export default AddEmploye;

