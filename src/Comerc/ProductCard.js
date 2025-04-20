// import React from "react";

// const ProductCard = ({ product, onAdd, onRemove, quantity, onImageClick }) => {
//   return (
//     <div className="card text-center shadow-sm p-3 h-100">
//       <img
//         src={product.image || "https://via.placeholder.com/150"}
//         alt={product.name}
//         className="card-img-top"
//         style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
//         onClick={() => onImageClick(product)}
//       />
//       <div className="card-body d-flex flex-column justify-content-between">
//         <h5 className="card-title">{product.name}</h5>
//         <p className="card-text text-primary fw-bold">{product.price} DH</p>

//         <div className="d-flex justify-content-center align-items-center gap-2">
//           <button className="btn btn-danger btn-sm" onClick={() => onRemove(product)}>-</button>
//           <span className="fw-bold">{quantity}</span>
//           <button className="btn btn-success btn-sm" onClick={() => onAdd(product)}>+</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";

const ProductCard = ({ product, onAdd, onRemove, quantity, onImageClick }) => {
  return (
    <div className="card h-100 shadow-sm border-0 hover-shadow">
      {/* Badge de promotion/catégorie */}
      {product.discount && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          -{product.discount}%
        </span>
      )}
      
      <div className="ratio ratio-1x1">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="card-img-top img-fluid p-3"
          style={{ cursor: "pointer", objectFit: "contain" }}
          onClick={() => onImageClick(product)}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <small className="text-muted text-uppercase">{product.category}</small>
          <h5 className="card-title mb-2">{product.name}</h5>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="h4 text-primary">{product.price} DH</span>
              {product.oldPrice && (
                <del className="text-muted small ms-2">{product.oldPrice} DH</del>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="badge bg-warning text-dark">
                {product.stock} left
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <button 
              className="btn btn-outline-danger rounded-circle p-2" 
              onClick={() => onRemove(product)}
              disabled={quantity === 0}
            >
              <i className="bi bi-dash-lg"></i>
            </button>
            
            <span className="badge bg-secondary fs-6">{quantity}</span>
            
            <button 
              className="btn btn-outline-success rounded-circle p-2" 
              onClick={() => onAdd(product)}
              disabled={product.stock === quantity}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>

          {product.stock === 0 && (
            <div className="alert alert-warning mt-2 mb-0 py-1 small">
              Out of stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
