import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer"

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedAddress, setEditedAddress] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(err => console.error('Erreur:', err));
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order.id);
    setEditedAddress(order.address);
  };

  const handleSave = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: editedAddress })
    })
      .then(res => res.json())
      .then(() => {
        const updatedOrders = orders.map(order =>
          order.id === id ? { ...order, address: editedAddress } : order
        );
        setOrders(updatedOrders);
        setEditingOrder(null);
      })
      .catch(err => console.error('Erreur lors de la mise à jour:', err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) return;

    fetch(`http://localhost:5000/orders/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch(err => console.error('Erreur lors de la suppression:', err));
  };

  const filteredOrders = orders.filter(order =>
    order.address?.toLowerCase().includes(search.toLowerCase()) ||
    order.user_id?.toString().includes(search)
  );

  return (
    <>
    <div className="container mt-4">
      <h2 className="mb-4">Liste des Commandes</h2>

      <input
        type="text"
        placeholder="Rechercher par adresse ou ID utilisateur"
        className="form-control mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Méthode Paiement</th>
            <th>Date</th>
            <th>Total</th>
            <th>Adresse</th>
            <th>Produits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.payment_method}</td>
             
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>{order.total_price} DH</td>
              <td>
                {editingOrder === order.id ? (
                  <div className="d-flex flex-column">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editedAddress}
                      onChange={e => setEditedAddress(e.target.value)}
                    />
                    <div>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(order.id)}>💾 Enregistrer</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingOrder(null)}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  order.address
                )}
              </td>
              <td>
                <ul className="list-unstyled">
                  {order.products.map((prod, idx) => (
                    <li key={idx}>
                      {prod.name} - {prod.quantity} x {prod.price} DH
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(order)}>✏️</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default AdminOrders;
