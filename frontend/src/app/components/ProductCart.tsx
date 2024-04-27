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
  const [isCartOpen, setIsCartOpen] = useState(true);  // Define the isCartOpen state here

  useEffect(() => {
    const initialItems: CartItem[] = [
      { id: 'curry1', name: 'Curry', price: 20.00, quantity: 2 },
      { id: 'naan', name: 'Garlic Naan', price: 4.49, quantity: 1 },
      { id: 'mango', name: 'Mango Lassi', price: 3.99, quantity: 1 }
    ];
    setCartItems(initialItems);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);  // Correctly toggle the visibility of the cart
  };

  return (
    <>
      <button onClick={toggleCart} style={{ position: 'fixed', top: 0, right: 0, zIndex: 30 }}>
        <img src="cart.png" alt="Toggle Cart" style={{ width: '40px', height: '40px' }} />
      </button>
      <div style={{
        position: 'fixed',
        top: 0,
        right: isCartOpen ? 0 : '-500px',  // Use isCartOpen to control the sidebar position
        width: '500px',
        maxHeight: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'right 0.3s ease-in-out'
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
                description="Please try our delicious, authentic curry"
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