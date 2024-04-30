import { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';

interface ChatInputProps {
  input : string;
  handleInputChange : (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, handleInputChange, handleSubmit }) => {
  return (
    <form className="flex pt-5" onSubmit={handleSubmit}> 
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-indigo-200 "
        placeholder="Type your message..."
      />
      <button className="bg-zinc-800 text-white px-4 py-2 rounded-r-md hover:bg-zinc-900 focus:outline-none">Send</button>
    </form>
  );
};

export default ChatInput;

