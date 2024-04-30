import Image from "next/image";
import { Message } from "ai/react";
import Payment from "./Payment";
import ChatProduct from "./ChatProduct";

interface ChatMessagesProps {
  messages: Message[];
  handleFoods: (message: Message) => {
    name: string;
    description: string;
    price: number;
  } | null;
  handleCheckout: (message: Message) => boolean;
  addToCart: (message: Message) => {
    name: string;
    description: string;
    price: number;
  };
  onOrderPlaced: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, handleFoods, handleCheckout, addToCart, onOrderPlaced }) => {
  return (
    <div className="flex flex-col h-5/6 overflow-y-auto bg-white shadow-lg rounded-lg pt-5">
      {/* Welcome message */}
      <div className="flex justify-start mb-4 mx-5">
        <Image
          width={1000}
          height={1000}
          className="w-8 h-8 rounded-full mr-2"
          src="/restaurant.png"
          alt="Restaurant Avatar"
        />
        <div className="shadow-md border-gray-100 rounded-lg px-3 py-2 text-base max-w-xs xl:max-w-xl bg-blue-200">
          <p>Welcome to our restaurant! How may I assist you today?</p>
        </div>
      </div>

      {messages.map((message: Message) => (
        <div key={message.id} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4 mx-5`}>
          {message.role === 'assistant' ? 
            <Image
              width={1000}
              height={1000}
              className="w-8 h-8 rounded-full mr-2"
              src="/restaurant.png"
              alt="Bot Avatar"
            /> : 
            <></>
          }
          <div className={`shadow-md border-gray-100 rounded-lg px-3 py-2 text-base max-w-xs xl:max-w-xl break-all ${message.role === 'assistant' ? 'bg-blue-200' : 'bg-indigo-100'}`}>
            {message.content.split("\n").map((currentTextBlock: string, index: number) => (
              <p className="break-all" key={message.id + index}>{currentTextBlock}</p>
            ))}
            <p className="text-sm text-gray-500">{message.role} {message.createdAt ? new Date(message.createdAt).toLocaleString() : 'Unknown Date'}</p>
            {handleFoods(message) !== null && <ChatProduct data={handleFoods(message)} />}
            {handleCheckout(message) && <Payment onOrderPlaced={onOrderPlaced} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;