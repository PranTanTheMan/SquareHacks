// ProductCard.tsx

import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  quantity: number;
  handleQuantityChange: (id: string, quantity: number) => void;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  quantity,
  handleQuantityChange,
  description,
}) => {
  return (
    <div
      style={{
        width: '400px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        margin: '10px',
      }}
    >
      <h3 style={{ margin: '0', padding: '0', fontWeight: 'bold', textAlign: 'left', width: '100%' }}>
        {name}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        <select
          value={quantity}
          onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
          style={{ margin: '0 5px 0 0', padding: '0', textAlign: 'right' }}
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <span style={{ margin: '0', padding: '0', textAlign: 'right' }}>
          x {price}
        </span>
      </div>
      <p style={{ margin: '0', padding: '0', textAlign: 'left', width: '100%' }}>
        {description}
      </p>
    </div>
  );
};

export default ProductCard;