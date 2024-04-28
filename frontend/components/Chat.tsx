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
    {name: "curry", description: "fnfanf", price: 20},
    {name: "chicken", description: "fnfanf", price: 20},
    {name: "lemonade", description: "fnfanf", price: 20},
    {name: "butter chicken", description: "fnfanf", price: 20},
    {name: "beef", description: "fnfanf", price: 20},
    {name: "rice", description: "fnfanf", price: 20},
    
  ]

  const handleFoods = (messages : Message) =>{
    if(messages.role == "assistant"){
      for(const food of test){
        if(messages.content.includes(food.name)){
          return true;
        }
      }
    }
    return false;
  }

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

