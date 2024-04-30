"use client"

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from 'ai/react';
import { Message } from 'ai';
import ProductCart from './ProductCart';

const Chat: React.FC = () => {
  const { input, handleInputChange, handleSubmit, messages } = useChat();

  console.log(messages);
  console.log(input);

  const test = [
    {id: 1, name: "curry",price: 20, quantity: 1, description: "fnfanf"},
    {id: 2, name: "chicken",price: 20, quantity: 1, description: "fnfanf" },
    {id: 3, name: "lemonade",price: 20, quantity: 1, description: "fnfanf" },
    {id: 4, name: "butter chicken",price: 20, quantity: 1, description: "fnfanf" },
    {id: 5, name: "beef",price: 20, quantity: 1, description: "fnfanf" },
    {id: 6, name: "rice",price: 20, quantity: 1, description: "fnfanf" },
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

  const handleCheckout = (message: Message): boolean | "" => {
    if (message.role === "assistant" && message.content.toLowerCase().includes("checkout")) {
      return true;
    }
    return false;
  };

  const addToCart = (message: Message) => {
    for (const food of test) {
      if (message.role === "user" && message.content.toLowerCase().includes(`add ${food.name} to cart`)) {
            return food;
      }
    }
    return null;
  }

  const foodInMessages = messages.map(message => handleFoods(message)).filter(food => food !== null);

  return (
    <>
    <div className='bg-gray-50 min-h-screen flex'>
      <div className="lg:w-3/5 w-full p-8 h-screen">
        <ChatMessages 
          addToCart={addToCart}
          handleFoods={handleFoods} 
          handleCheckout={handleCheckout}
          messages={messages} 
        />
        <ChatInput handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} />
      </div>
      <ProductCart foods={foodInMessages} />
    </div>
    </>
  );
};

export default Chat;
