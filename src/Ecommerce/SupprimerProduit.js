import React from 'react';
import axios from 'axios';

const SupprimerProduit = ({ produitId, fetchProduits }) => {
  // دالة لحذف منتج
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:5000/products/${produitId}`);
        fetchProduits(); // إعادة جلب المنتجات بعد الحذف
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Supprimer
    </button>
  );
};

export default SupprimerProduit;