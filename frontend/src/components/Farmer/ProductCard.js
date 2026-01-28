import React from 'react';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5>Product ID: {product.product?.pid}</h5>
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.qty}</p>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(product.psId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
