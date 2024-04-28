import Image from "next/image";
import { Message } from "ai/react";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col h-[600px] lg:h-[700px] overflow-y-auto bg-white shadow-lg rounded-lg pt-5">
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
          <div className={`shadow-md border-gray-100 rounded-lg px-3 py-2 text-base max-w-xs xl:max-w-xl break-all ${message.role == 'assistant' ? 'bg-indigo-300' : 'bg-blue-200'}`}>
          {message.content.split("\n").map((currentTextBlock: string, index: number) => {
            if(currentTextBlock === ""){
              return <p key={message.id + index}></p>
            } else {
              return <p key={message.id + index}>{currentTextBlock}</p>
            }
          })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;


