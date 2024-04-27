// ProductCart.tsx
"use client"

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddProduct = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveProduct = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
    );
  };

  useEffect(() => {
    // Example initial item
    const newItem: CartItem = {
      id: 'curry1',
      name: 'Curry',
      price: 20.00,
      quantity: 2
    };
    setCartItems([newItem]);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="fixed top-0 right-0 w-[500px] h-auto bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your Cart is empty.</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={`$${item.price.toFixed(2)}`}
              quantity={item.quantity}
              handleAddProduct={() => handleAddProduct(item.id)}
              handleRemoveProduct={() => handleRemoveProduct(item.id)}
              description="Please try our delicious, authentic curry"
            />
          ))}
        </div>
      )}
      <div>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ProductCart;