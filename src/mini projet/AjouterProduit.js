import React, { useState } from 'react';
import Swal from 'sweetalert2';

function AjouterProduit({ onAddProduct }) {
  const [reference, setReference] = useState('');
  const [libelle, setLibelle] = useState('');
  const [prix, setPrix] = useState('');
  const [date, setDate] = useState('');
  const [categorie, setCategorie] = useState('');

  const handleSubmit = () => {
    if (!reference || !libelle || !prix || !date || !categorie) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }

    const newProduct = { reference, libelle, prix, date, categorie };
    onAddProduct(newProduct); // تمرير المنتج إلى قائمة المنتجات
    Swal.fire('Succès', 'Produit ajouté avec succès!', 'success');

    // Réinitialiser les champs
    setReference('');
    setLibelle('');
    setPrix('');
    setDate('');
    setCategorie('');
  };

  return (
    <div>
      <h2>Ajouter Produit</h2>
      <input type="text" placeholder="Référence" value={reference} onChange={(e) => setReference(e.target.value)} />
      <input type="text" placeholder="Libellé" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
      <input type="number" placeholder="Prix Unitaire" value={prix} onChange={(e) => setPrix(e.target.value)} />
      <input type="date" placeholder="Date Achat" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Catégorie" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
}

export default AjouterProduit;