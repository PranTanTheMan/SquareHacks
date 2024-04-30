// ProductCard.tsx

import React from 'react';

// Interface for props expected by the ProductCard component.
interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  quantity: number;
  handleQuantityChange: (id: string, quantity: number) => void;
  description: string;
}

// Component to display individual product details within the cart.
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  quantity,
  handleQuantityChange,
  description,
}) => {
  return (
    <div className=' w-auto xl:w-[400px] rouned-lg bg-white shadow-md flex flex-col p-3 m-3'>
      <h3 className='font-bold text-left w-full'>{name}</h3>
      <div className='flex justify-end items-center w-full'>
        <select
          value={quantity}
          onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
          className='text-right mr-5'>
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <span className='text-right'>
          x {price}
        </span>
      </div>
      <p className='text-left w-full'>{description}</p>
    </div>
  );
};

export default ProductCard;