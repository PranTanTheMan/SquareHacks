"use client"

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
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, handleFoods }) => {

  return (
    <div className="flex flex-col h-[600px] lg:h-[700px] overflow-y-auto bg-white shadow-lg rounded-lg pt-5">
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


      {messages.map((message : Message) => (
        <div key={message.id} className={`flex ${message.role == 'assistant' ? 'justify-start' : 'justify-end'} mb-4 mx-5`}>
          {/* Bot picture */}
          {message.role == 'assistant' ? 
            <Image
            width={1000}
            height={1000}
              className="w-8 h-8 rounded-full mr-2"
              src="/restaurant.png"
              alt="Bot Avatar"
            /> : 
            <></>
          }
          {/* Text messages */}
          <div className={`shadow-md border-gray-100 rounded-lg px-3 py-2 text-base max-w-xs xl:max-w-xl break-all ${message.role == 'assistant' ? 'bg-blue-200' : 'bg-indigo-100'}`}>
          {message.content.split("\n").map((currentTextBlock: string, index: number) => {
            if(currentTextBlock === ""){
              return <p className="break-all" key={message.id + index}></p>
            } else {
              return <p className="break-all" key={message.id + index}>{currentTextBlock}</p>
            }
          })}
           <p className="text-sm text-gray-500">{message.role} {message.createdAt ? new Date(message.createdAt).toLocaleString() : 'Unknown Date'}</p>
           {handleFoods(message) !== null ? <ChatProduct data={handleFoods(message)} /> : <></>}
           
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;


