// ProductCard.tsx

import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  quantity: number;
  handleAddProduct: () => void;
  handleRemoveProduct: () => void;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  quantity,
  handleAddProduct,
  handleRemoveProduct,
  description,
}) => {
  return (
    <div
      style={{
        width: '400px',
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px',
      }}
    >
      <h3 style={{ margin: '0', padding: '0' }}>{name}</h3>
      <p style={{ margin: '0', padding: '0' }}>Price: {price}</p>
      <p style={{ margin: '0', padding: '0' }}>Quantity: {quantity}</p>
      <p style={{ margin: '0', padding: '0' }}>{description}</p>
      <div style={{ display: 'flex', marginTop: '10px', width: '100%', justifyContent: 'space-between' }}>
        <button onClick={handleRemoveProduct} style={{ color: 'red', width: '100px', height: '30px' }}>
          -
        </button>
        <button onClick={handleAddProduct} style={{ color: 'red', width: '100px', height: '30px' }}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;