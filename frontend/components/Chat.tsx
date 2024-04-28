"use client"

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from 'ai/react';

const Chat: React.FC = () => {

  const { input, handleInputChange, handleSubmit, messages } = useChat();

  console.log(messages);
  console.log(input);

  return (
    <>
      <div className="lg:w-3/5 p-8">
        <ChatMessages messages={messages} />
        <ChatInput handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} />
      </div>
    </>
  );
};

export default Chat;

