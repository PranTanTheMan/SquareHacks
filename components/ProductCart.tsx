"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";

// Interface defining the structure of a cart item.
interface FoodItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

interface ProductCartProps {
  foods: any[];
  handleQuantityChange: (id: number, quantity: number) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ foods }) => {
  // Initialize cartItems state with the foods passed as props
  const [cartItems, setCartItems] = useState<FoodItem[]>(foods);
  // State to manage the visibility of the cart sidebar.
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to update the quantity of a specific item in the cart.
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
          .filter((item) => item.quantity > 0) // Ensures items with zero quantity are removed.
    );
  };

  // Function to calculate the total cost of the items in the cart.
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to toggle the visibility of the cart sidebar.
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // When foods prop changes, update the cartItems state
  useEffect(() => {
    setCartItems(foods);
  }, [foods]);

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed top-5 right-5 z-40 lg:hidden"
      >
        <Image src="/cart.png" width={40} height={40} alt="Toggle Cart" />
      </button>
      <div className="hidden lg:rounded-lg lg:shadow-lg lg:m-8 lg:p-5 lg:block lg:h-full bg-white ">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-blue-600 bg-blue-200 w-[400px] rounded-lg p-3 text-left mx-auto my-3">
            Your Cart is empty. Please speak to our virtual assistant to start
            exploring our delicious menu!
          </div>
        ) : (
          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
            {foods.map((food) => (
              <ProductCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                quantity={food.quantity}
                handleQuantityChange={handleQuantityChange}
                description={food.description}
              />
            ))}
          </div>
        )}
        <div>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <p className="text-sm mt-4 text-gray-500">
            Place your order for pick up today!
          </p>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed top-0 right-0 mt-8 rounded-lg shadow-lg p-5 block h-auto bg-white lg:hidden">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className="text-blue-600 bg-blue-200 w-[400px] rounded-lg p-3 text-left mx-auto my-3">
              Your Cart is empty. Please speak to our virtual assistant to start
              exploring our delicious menu!
            </div>
          ) : (
            <div
              style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            >
              {foods.map((food) => (
                <ProductCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  price={food.price}
                  quantity={food.quantity}
                  handleQuantityChange={handleQuantityChange}
                  description={food.description}
                />
              ))}
            </div>
          )}
          <div>
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <p className="text-sm mt-4 text-gray-500">
              Place your order for pick up today!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCart;
