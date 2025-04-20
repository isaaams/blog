import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";

const Cart = ({ cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();
  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  return (
    <>
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
              onClick={() =>
                navigate('/checkout', {
                  state: {
                    products: Object.values(cart),
                    totalPrice,
                  },
                })
              }
            >
              الدفع الآن
            </button>
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
