import React, { useState } from 'react';
import ChatCard from '../components/ChatCard';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';
import { lawBotFeatures } from '../utils/constants';

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
    <div className=" flex flex-row items-center min-h-screen bg-bg justify-between">
      <div className='flex-col bg-tertiary w-1/2 min-h-screen flex justify-center items-center'>
        <h1 className='text-bg text-6xl font-extralight text-center'>CaseWise <br></br> LawBot!</h1>
        <div className='flex flex-col m-5 gap-2 '>
          {lawBotFeatures.map((item)=>
            <div className='p-5 rounded-3xl bg-bg'>
              <h1 className='text-primary font-bold text-xl'>
                {item.title}
              </h1>
              <h1 className='text-primary '>
                {item.description}
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className='w-1/2 bg-bg flex-col min-h-screen max-h-screen flex justify-between p-2'>
        <div className="flex-col px-2 overflow-y-scroll mb-2">
          {messageList.map((chatItem: ChatItem, index: React.Key | null | undefined) => (
            <ChatCard key={index} chatItem={chatItem} />
          ))}
        </div>

        <div className="self-center w-full mb-2 flex justify-center p-1 bg-darkbg rounded-full">
          <input
            type="text"
            className="flex-grow bg-darkbg p-5 rounded-l-full focus:outline-none text-bg"
            placeholder="Type your question here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-3 text-darkbg bg-bg font-bold rounded-full"
            disabled={responseLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
