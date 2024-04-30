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

  console.log(messages);
  console.log(input);

  const test = [
    {
      id: 1,
      name: "butter chicken",
      price: 15,
      quantity: 1,
      description:
        "Tender chicken cooked in a rich and creamy tomato-based sauce.",
    },
    {
      id: 2,
      name: "palak paneer",
      price: 12,
      quantity: 1,
      description:
        "Spinach cooked with cubes of Indian cottage cheese in a flavorful blend of spices.",
    },
    {
      id: 3,
      name: "chole bhature",
      price: 10,
      quantity: 1,
      description:
        "Spicy chickpea curry served with deep-fried bread called bhature.",
    },
    {
      id: 4,
      name: "biryani",
      price: 18,
      quantity: 1,
      description:
        "Fragrant rice cooked with marinated meat or vegetables, seasoned with aromatic spices.",
    },
    {
      id: 5,
      name: "masala dosa",
      price: 8,
      quantity: 1,
      description:
        "Crispy crepe made from fermented rice and lentil batter, filled with a spicy potato filling.",
    },
    {
      id: 6,
      name: "samosa",
      price: 5,
      quantity: 1,
      description:
        "Triangular pastry filled with spiced potatoes, peas, and sometimes meat, then deep-fried until golden brown.",
    },
    {
      id: 7,
      name: "gulab jamun",
      price: 6,
      quantity: 1,
      description:
        "Soft, spongy, and sweet milk-based dumplings soaked in flavored sugar syrup, often served as a dessert.",
    },
    {
      id: 8,
      name: "tandoori chicken",
      price: 14,
      quantity: 1,
      description:
        "Chicken marinated in a blend of yogurt and spices, then cooked to perfection in a clay oven (tandoor).",
    },
    {
      id: 9,
      name: "rogan josh",
      price: 16,
      quantity: 1,
      description:
        "Tender lamb cooked in a rich gravy flavored with aromatic spices like cardamom, cloves, and cinnamon.",
    },
    {
      id: 10,
      name: "aloo gobi",
      price: 11,
      quantity: 1,
      description:
        "A flavorful vegetarian dish made with potatoes (aloo) and cauliflower (gobi) cooked with onions, tomatoes, and spices.",
    },
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

  const addToCart = (
    message: Message
  ): { name: string; description: string; price: number } | null => {
    for (const food of test) {
      if (
        message.role === "user" &&
        message.content.toLowerCase().includes(`add ${food.name} to cart`)
      ) {
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
            addToCart={addToCart}
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
