import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Footer";


const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!state?.products?.length) {
      alert("السلة فارغة.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert('Veuillez vous connecter pour finaliser la commande.');
      return;
    }

    const orderData = {
      userId: user.id,
      products: state.products,
      totalPrice: state.totalPrice,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Commande effectuée avec succès !');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erreur lors de la commande.');
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
    <div className="checkout-container container mt-4">
      <h2>Finalisation de la commande</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Nom complet :</label>
          <input
            type="text"
            required
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Email :</label>
          <input
            type="email"
            required
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Adresse :</label>
          <textarea
            required
            className="form-control"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label>Méthode de paiement :</label><br />
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="payment"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
            />
            <label className="form-check-label">Paiement à la livraison</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">Confirmer l'achat</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Checkout;
