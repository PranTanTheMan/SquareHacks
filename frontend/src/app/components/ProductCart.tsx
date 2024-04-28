// ProductCart.tsx
"use client"

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Image from 'next/image';

// Interface defining the structure of a cart item.
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const ProductCart: React.FC = () => {
  // State to manage the list of items in the cart.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // State to manage the visibility of the cart sidebar.
  const [isCartOpen, setIsCartOpen] = useState(true);

  // Effect to load initial items into the cart.
  useEffect(() => {
    const initialItems: CartItem[] = [
      { id: 'curry1', name: 'Curry', price: 20.00, quantity: 2, description: 'Please try our delicious curry' },
      { id: 'naan', name: 'Garlic Naan', price: 4.49, quantity: 1, description: 'Please try our amazing naan' },
      { id: 'mango', name: 'Mango Lassi', price: 3.99, quantity: 1, description:'our Mango Lassi is sure to cure your thirst' }
    ];
    setCartItems(initialItems);
  }, []);

  // Function to update the quantity of a specific item in the cart.
  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      ).filter(item => item.quantity > 0) // Ensures items with zero quantity are removed.
    );
  };

  // Function to calculate the total cost of the items in the cart.
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to toggle the visibility of the cart sidebar.
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <button onClick={toggleCart} style={{ position: 'fixed', top: 0, right: 0, zIndex: 30 }}>
        <Image src="/cart.png" width= {40} height={40} alt="Toggle Cart"/>
      </button>
      <div style={{
        position: 'fixed',
        top: 0,
        right: isCartOpen ? 0 : '-500px',
        width: '500px',
        maxHeight: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'right 0.3s ease-in-out',
        borderRadius: '10px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div style={{
            backgroundColor: 'lightblue',
            color: 'darkblue',
            width: '400px',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'left',
            margin: '10px auto'
          }}>
            Your Cart is empty. Please speak to our virtual assistant to start exploring our delicious menu!
          </div>
        ) : (
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            {cartItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={`$${item.price.toFixed(2)}`}
                quantity={item.quantity}
                handleQuantityChange={handleQuantityChange}
                description={item.description}
              />
            ))}
          </div>
        )}
        <div>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Place your order for pick up today!</p>
        </div>
      </div>
    </>
  );
};

export default ProductCart;