import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "./Home.css";

const Home = ({ addToCart, removeFromCart, cart, produits }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    setLoading(false);
  }, [navigate]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handlePurchase = () => {
    navigate('/checkout', { state: { product: selectedProduct } });
    setShowModal(false);
  };

  const filteredProducts = produits.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loading-overlay">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <div className="error-alert">
      <p>⚠️ {error}</p>
    </div>
  );

  return (
    <div className="home-container">
      <header className="hero-banner">
        <img 
          src="th3.jpeg" 
          alt="متجر الأصدقاء" 
          className="hero-image"
        />
        <h1 className="hero-title">Bienvenue dans la boutique des amis</h1>
      </header>

      <section className="product-search">
        <input
          type="text"
          className="search-input"
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="alert alert-info">لا توجد منتجات متاحة</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              onRemove={removeFromCart}
              quantity={cart[product.id]?.quantity || 0}
              onImageClick={handleProductClick}
            />
          ))
        )}
      </section>

      {showModal && (
        <div className="product-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p className="product-description">{selectedProduct.description}</p>
            <div className="price-section">
              <span className="price">{selectedProduct.price} DH</span>
              <button className="buy-now" onClick={handlePurchase}>اشتري الآن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;