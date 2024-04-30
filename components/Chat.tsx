"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useState } from "react";
import ProductCart from "./ProductCart";

const Chat: React.FC = () => {
  const { input, handleInputChange, handleSubmit, messages } = useChat();

  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (message: Message) => {
    addToCart(message, cartItems, setCartItems);
  };

  console.log(messages);
  console.log(input);

  const test = [
    { id: 1, name: "curry", price: 20, quantity: 1, description: "fnfanf" },
    { id: 2, name: "chicken", price: 20, quantity: 1, description: "fnfanf" },
    { id: 3, name: "lemonade", price: 20, quantity: 1, description: "fnfanf" },
    {id: 4, name: "butter chicken", price: 20, quantity: 1, description: "fnfanf"},
    { id: 5, name: "beef", price: 20, quantity: 1, description: "fnfanf" },
    { id: 6, name: "rice", price: 20, quantity: 1, description: "fnfanf" },
  ];

  const handleFoods = (message: Message) => {
    if (message.role === "assistant") {
      for (const food of test) {
        if (message.content.toLowerCase().includes(food.name)) {
          return food;
        }
      }
    }
    return null;
  };

  const handleCheckout = (message: Message): boolean => {
    if (
      message.role === "assistant" &&
      message.content.toLowerCase().includes("checkout")
    ) {
      return true;
    }
    return false;
  };

  const handleAddToCartWrapper = (message: Message) => {
    const addedItem = addToCart(message, cartItems, setCartItems);
    return addedItem;
  };

  const addToCart = (
    message: Message,
    cartItems: any[],
    setCartItems: (items: any[]) => void
  ): { name: string; description: string; price: number } | null => {
    for (const food of test) {
      if (
        message.role === "user" &&
        message.content.toLowerCase().includes(`add ${food.name} to cart`)
      ) {
        const existingItem = cartItems.find((item) => item.id === food.id);
        if (existingItem) {
          // If the item already exists in the cart, update its quantity
          const updatedCartItems = cartItems.map((item) =>
            item.id === food.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartItems(updatedCartItems);
        } else {
          // If the item doesn't exist in the cart, add it with quantity 1
          setCartItems([...cartItems, { ...food, quantity: 1 }]);
        }
        return food;
      }
    }
    // Return null when no matching food is found
    return null;
  };

  const handleOrderPlaced = () => {
    // Handle order placed logic here
    console.log("Order placed!");
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex">
        <div className="lg:w-3/5 w-full p-8 h-screen">
          <ChatMessages
            addToCart={handleAddToCartWrapper}
            handleFoods={handleFoods}
            handleCheckout={handleCheckout}
            messages={messages}
            onOrderPlaced={handleOrderPlaced}
          />
          <ChatInput
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            input={input}
          />
        </div>
        <ProductCart
          foods={cartItems}
          handleQuantityChange={(id: number, quantity: number) => {
            const updatedCartItems = cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
            setCartItems(updatedCartItems);
          }}
        />
      </div>
    </>
  );
};

export default Chat;