import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard',
    creditCardType: 'paypal'
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert('Veuillez vous connecter pour finaliser la commande.');
      return;
    }

    const orderData = {
      userId: user.id,
      products: state?.products || [],
      totalPrice: state?.totalPrice || 0,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      creditCardType: formData.paymentMethod === 'creditCard' ? formData.creditCardType : null,
      cardNumber: formData.paymentMethod === 'creditCard' ? cardDetails.number : null,
      cardExpiry: formData.paymentMethod === 'creditCard' ? cardDetails.expiry : null,
      cardCVC: formData.paymentMethod === 'creditCard' ? cardDetails.cvc : null,
    };

    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Commande effectuée avec succès ! Nous vous contacterons pour confirmer les détails.');
        navigate('/');
      } else {
        let errorMessage = 'Une erreur est survenue lors de la commande. Veuillez réessayer.';
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = `Erreur : ${errorData.message}`;
          }
        } catch (err) {
          console.error("Erreur lors de l'analyse de la réponse :", err);
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalisation de la commande : {state?.product?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom complet :</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Adresse :</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          ></textarea>
        </div>

        <div className="payment-methods">
          <h3>Méthode de paiement :</h3>
          <div className="payment-options">
            <label className={formData.paymentMethod === 'creditCard' ? 'active' : ''}>
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={formData.paymentMethod === 'creditCard'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'creditCard' })}
              />
              <span className="payment-icon">💳</span>
              Carte de crédit
            </label>
            <label className={formData.paymentMethod === 'cash' ? 'active' : ''}>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
              />
              <span className="payment-icon">💰</span>
              Paiement à la livraison
            </label>
          </div>

          {formData.paymentMethod === 'creditCard' && (
            <div className="form-group">
              <label>Choisissez le type de carte :</label>
              <select
                value={formData.creditCardType}
                onChange={(e) =>
                  setFormData({ ...formData, creditCardType: e.target.value })
                }
              >
                <option value="paypal">PayPal</option>
                <option value="visa">Visa / MasterCard</option>
              </select>

              {formData.creditCardType === 'visa' && (
                <div className="mt-4">
                  <PaymentForm setCardDetails={setCardDetails} />
                </div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="confirm-purchase">Confirmer l'achat</button>
      </form>
    </div>
  );
};

export default Checkout;
