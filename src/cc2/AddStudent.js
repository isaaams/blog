import React, { useState } from 'react';

const AddStudent = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [math, setMath] = useState('');
    const [physique, setPhysique] = useState('');
    const [francais, setFrancais] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            id: Date.now(), 
            nom: name,
            math: parseFloat(math),
            Physique: parseFloat(physique),
            Français: parseFloat(francais),
        };
        onAdd(newStudent);
        setName('');
        setMath('');
        setPhysique('');
        setFrancais('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Math" value={math} onChange={(e) => setMath(e.target.value)} required />
            <input type="number" placeholder="Physics" value={physique} onChange={(e) => setPhysique(e.target.value)} required />
            <input type="number" placeholder="French" value={francais} onChange={(e) => setFrancais(e.target.value)} required />
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudent;