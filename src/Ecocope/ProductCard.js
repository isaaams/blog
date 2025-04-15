import React from "react";

const ProductCard = ({ product, onAdd, onRemove, quantity, onImageClick }) => {
  return (
    <div className="card text-center shadow-sm p-3 h-100">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="card-img-top"
        style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
        onClick={() => onImageClick(product)}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-primary fw-bold">{product.price} DH</p>

        <div className="d-flex justify-content-center align-items-center gap-2">
          <button className="btn btn-danger btn-sm" onClick={() => onRemove(product)}>-</button>
          <span className="fw-bold">{quantity}</span>
          <button className="btn btn-success btn-sm" onClick={() => onAdd(product)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
