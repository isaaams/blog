import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function ModifierProduit({ product, onUpdateProduct }) {
  const [reference, setReference] = useState('');
  const [libelle, setLibelle] = useState('');
  const [prix, setPrix] = useState('');
  const [date, setDate] = useState('');
  const [categorie, setCategorie] = useState('');

  useEffect(() => {
    if (product) {
      setReference(product.reference);
      setLibelle(product.libelle);
      setPrix(product.prix);
      setDate(product.date);
      setCategorie(product.categorie);
    }
  }, [product]);

  const handleUpdate = () => {
    const updatedProduct = { reference, libelle, prix, date, categorie };
    onUpdateProduct(updatedProduct); // تحديث المنتج في القائمة
    Swal.fire('Succès', 'Produit modifié avec succès!', 'success');
  };

  return (
    <div>
      <h2>Modifier Produit</h2>
      <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
      <input type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
      <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
      <button onClick={handleUpdate}>Modifier</button>
    </div>
  );
}

export default ModifierProduit;