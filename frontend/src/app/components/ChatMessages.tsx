// ChatMessages.tsx
import React from 'react';
import Image from 'next/image';
import Payment from './Payment'; // Ensure this import is correct

interface ChatMessagesProps {
  messages: { text: string; isBot: boolean }[];
  showPayment: boolean;
  onOrderPlaced: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, showPayment, onOrderPlaced }) => {
  return (
    <div className="flex flex-col h-[600px] lg:h-[700px] overflow-y-auto bg-white shadow-lg rounded-lg pt-5">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4 mx-5`}>
          {message.isBot && (
            <Image
              width={40}
              height={40}
              className="w-8 h-8 rounded-full mr-2"
              src="/botpfp.png"
              alt="Bot Avatar"
            />
          )}
          <div
            className={`shadow-md border-gray-100 rounded-lg px-3 py-2 text-base max-w-xs xl:max-w-md break-all ${
              message.isBot ? 'bg-indigo-300' : 'bg-blue-200'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {showPayment && <Payment onOrderPlaced={onOrderPlaced} />}
    </div>
  );
};

export default ChatMessages;