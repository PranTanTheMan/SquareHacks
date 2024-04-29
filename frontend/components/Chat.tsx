"use client"

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from 'ai/react';
import { Message } from 'ai';

const Chat: React.FC = () => {

  const { input, handleInputChange, handleSubmit, messages } = useChat();

  console.log(messages);
  console.log(input);

  const test = [ 
    {name: "Curry", description: "fnfanf", price: 20},
    {name: "Chicken", description: "fnfanf", price: 20},
    {name: "Lemonade", description: "fnfanf", price: 20},
    {name: "Butter chicken", description: "fnfanf", price: 20},
    {name: "Beef", description: "fnfanf", price: 20},
    {name: "Rice", description: "fnfanf", price: 20},
    
  ]

  const handleFoods = (message: Message) => {
    if (message.role === "assistant") {
      for (const food of test) {
        if (message.content.includes(food.name)) {
          return food;
        }
      }
    }
    return null;
  };

  return (
    <>
      <div className="lg:w-3/5 p-8">
        <ChatMessages handleFoods={handleFoods} messages={messages} />
        <ChatInput handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} />
      </div>
    </>
  );
};

export default Chat;

