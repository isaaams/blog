import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      userId: user.id,
      products: [state.product],
      totalPrice: state.product.price,
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
        alert('تم إتمام الطلب بنجاح! سيتم التواصل معك لتأكيد التفاصيل.');
        navigate('/');
      } else {
        alert('حدث خطأ أثناء إتمام الطلب.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('حدث خطأ أثناء إتمام الطلب.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>إتمام الشراء: {state?.product?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الاسم الكامل:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>العنوان:</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          ></textarea>
        </div>
        <div className="payment-methods">
          <h3>طريقة الدفع:</h3>
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
              بطاقة ائتمان
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
              الدفع عند الاستلام
            </label>
          </div>
        </div>
        <button type="submit" className="confirm-purchase">تأكيد الشراء</button>
      </form>
    </div>
  );
};

export default Checkout;