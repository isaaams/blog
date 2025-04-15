import React from 'react';
import Swal from 'sweetalert2';

function ListeProduit({ produits, onDeleteProduct, onEditProduct }) {
  const handleDelete = (reference) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteProduct(reference);
        Swal.fire('Supprimé!', 'Le produit a été supprimé.', 'success');
      }
    });
  };

  return (
    <div>
      <h2>Produits</h2>
      <table>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Libellé</th>
            <th>Prix Unitaire</th>
            <th>Date Achat</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit, index) => (
            <tr key={index}>
              <td>{produit.reference}</td>
              <td>{produit.libelle}</td>
              <td>{produit.prix}</td>
              <td>{produit.date}</td>
              <td>{produit.categorie}</td>
              <td>
                <button onClick={() => onEditProduct(produit)}>Modifier</button>
                <button onClick={() => handleDelete(produit.reference)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeProduit;