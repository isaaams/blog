import React from "react";

const ProductCard = ({ product, onAdd, onRemove, quantity, onImageClick }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image || "https://via.placeholder.com/150"} 
        alt={product.name} 
        className="product-image"
        onClick={() => onImageClick(product)}
      />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price} DH</p>
      <div className="quantity-controls">
        <button onClick={() => onRemove(product)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onAdd(product)}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;