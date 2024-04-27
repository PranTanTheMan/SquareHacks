"use client"

import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex pt-5">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-indigo-200 "
        placeholder="Type your message..."
      />
      <button
        onClick={handleSendMessage}
        className="bg-zinc-800 text-white px-4 py-2 rounded-r-md hover:bg-zinc-900 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
