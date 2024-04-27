"use client"

import { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
//import { OpenAI } from "openai";
//import { createAI, getMutableAIState, render } from "ai/rsc";

//const openai = new OpenAI({
//  apiKey: process.env.OPENAI_API_KEY || '',
//});

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);

  useEffect(() => {
    setMessages([{ text: 'Welcome to the India Spice House! How may I assist you today?', isBot: true }]);
  }, []); 

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, isBot: false }]);
  };

  return (
    <>
      <div className="lg:w-3/5 p-8">
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default Chat;
