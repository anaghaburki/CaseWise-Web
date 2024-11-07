import React, { useState } from 'react';
import ChatCard from '../components/ChatCard';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';

export default function LawBot() {
  const [inputMessage, setInputMessage] = useState('');
  const [ messageList, getChatResponse, responseLoading ] = useStore(
    useShallow((state)=> [state.messageList, state.getChatResponse, state.responseLoading])
  );

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; 
    setInputMessage('');
    useStore.setState({
      messageList: [
        ...messageList,
        {
          ai: false,
          message: inputMessage.trim(),
          time: new Date().toLocaleTimeString().slice(0, -3),
        },
      ]
    })
    await getChatResponse({ ai: false, message: inputMessage.trim(), time: new Date().toLocaleTimeString().slice(0, -3) });
  };

  return (
    <div className=" flex flex-col min-h-screen bg-bg justify-between">
      <div className="flex flex-col px-2">
        {messageList.map((chatItem: ChatItem, index: React.Key | null | undefined) => (
          <ChatCard key={index} chatItem={chatItem} />
        ))}
      </div>

      <div className="self-center w-1/2 mb-2 flex justify-center p-3 bg-darkbg rounded-full">
        <input
          type="text"
          className="flex-grow bg-darkbg p-3 rounded-l-full focus:outline-none text-bg"
          placeholder="Type your question here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-3 bg-primary text-white rounded-r-full"
          disabled={responseLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
