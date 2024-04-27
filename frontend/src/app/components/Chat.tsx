// Chat.tsx
"use client";

import { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  const [messages, setMessages] = useState([{ text: 'Welcome to the India Spice House! How may I assist you today?', isBot: true }]);

  const handleSendMessage = async (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isBot: false }]);
    try {
      // Send the user message to your API route
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const { botMessage } = await response.json();
      setMessages(prevMessages => [...prevMessages, { text: botMessage, isBot: true }]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, there was an error processing your request.', isBot: true }]);
    }
  };

  return (
    <div className="lg:w-3/5 p-8">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;