// Chat.tsx
"use client";

import { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  const [messages, setMessages] = useState([{ text: 'Hey! Welcome to the India Spice House! I am your virtual waiter, would you like to order?', isBot: true }]);
  const [showPayment, setShowPayment] = useState(false);

  const handleSendMessage = async (message: string) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isBot: false }]);
    if (/check\s*out/i.test(message.toLowerCase())) {
      setShowPayment(true); // Show the Payment component
    } else {
      try {
        // Simulate an API call to get a response from the chatbot
        const botResponse = "How can I assist you further?";
        setMessages(prevMessages => [...prevMessages, { text: botResponse, isBot: true }]);
      } catch (error) {
        console.error('Error fetching chat completion:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Sorry, there was an error processing your request.', isBot: true }]);
      }
    }
  };

  const handleOrderPlaced = () => {
    
    setMessages(prevMessages => [...prevMessages, { text: 'Your order has been successfully received and is being processed. Thank you for visiting The India Spice House and hope to see you soon!', isBot: true }]);
  };

  return (
    <div className="lg:w-3/5 p-8">
      <ChatMessages messages={messages} showPayment={showPayment} onOrderPlaced={handleOrderPlaced} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;