import React from "react";
import ProductCard from "./ProductCard";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({ cart, addToCart, removeFromCart }) => {
  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">سلة المشتريات</h2>
      {Object.keys(cart).length === 0 ? (
        <div className="alert alert-info">السلة فارغة</div>
      ) : (
        <>
          <div className="row">
            {Object.values(cart).map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard
                  product={product}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  quantity={product.quantity}
                  showDescription={false}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-light rounded">
            <h4 className="text-end">
              Total: <span className="text-primary">{totalPrice.toFixed(2)} €</span>
            </h4>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => window.location.href = '/checkout'}
            >
              الدفع الآن
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
