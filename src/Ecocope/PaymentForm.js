import React, { useState, useEffect } from 'react';

const PaymentForm = ({ setCardDetails }) => {
  const [method, setMethod] = useState('card');
  const [localCardDetails, setLocalCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

  const handleCardInput = (e) => {
    const updated = { ...localCardDetails, [e.target.name]: e.target.value };
    setLocalCardDetails(updated);
    setCardDetails(updated); // نرسل التحديث للأب
  };

  const validateCardDetails = () => {
    const newErrors = {};
    const cardNumberPattern = /^[0-9]{16}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvcPattern = /^[0-9]{3}$/;

    if (!cardNumberPattern.test(localCardDetails.number)) {
      newErrors.number = 'رقم البطاقة غير صالح';
    }
    if (!expiryPattern.test(localCardDetails.expiry)) {
      newErrors.expiry = 'تاريخ الانتهاء غير صالح';
    }
    if (!cvcPattern.test(localCardDetails.cvc)) {
      newErrors.cvc = 'رمز الأمان غير صالح';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCardDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // هنا يمكنك إرسال البيانات إلى الأب أو السيرفر
      alert("تم إرسال بيانات البطاقة بنجاح");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">طريقة الدفع</h2>

      <div className="flex justify-around mb-6 border-b">
        <button
          onClick={() => setMethod('card')}
          className={`px-4 py-2 ${method === 'card' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          💳 بطاقة ائتمان
        </button>
        <button
          onClick={() => setMethod('paypal')}
          className={`px-4 py-2 ${method === 'paypal' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          🅿️ PayPal
        </button>
        <button
          onClick={() => setMethod('gpay')}
          className={`px-4 py-2 ${method === 'gpay' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          💰 Google Pay
        </button>
      </div>

      {method === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">رقم البطاقة</label>
            <input
              type="text"
              name="number"
              placeholder="XXXX XXXX XXXX XXXX"
              className={`w-full border rounded px-3 py-2 ${errors.number ? 'border-red-500' : ''}`}
              value={localCardDetails.number}
              onChange={handleCardInput}
              required
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">تاريخ الانتهاء</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                className={`w-full border rounded px-3 py-2 ${errors.expiry ? 'border-red-500' : ''}`}
                value={localCardDetails.expiry}
                onChange={handleCardInput}
                required
              />
              {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1">رمز الأمان</label>
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                className={`w-full border rounded px-3 py-2 ${errors.cvc ? 'border-red-500' : ''}`}
                value={localCardDetails.cvc}
                onChange={handleCardInput}
                required
              />
              {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
            </div>
          </div>
        </div>
      )}

      {method === 'paypal' && (
        <div className="text-center p-4 border rounded bg-gray-50">
          سيتم تحويلك إلى PayPal لإتمام الدفع.
        </div>
      )}

      {method === 'gpay' && (
        <div className="text-center p-4 border rounded bg-gray-50">
          سيتم استخدام Google Pay لإتمام المعاملة.
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        تأكيد الدفع
      </button>
    </div>
  );
};

export default PaymentForm;
