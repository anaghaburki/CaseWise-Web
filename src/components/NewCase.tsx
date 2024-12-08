import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';

const NewCase: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [initNewCase, responseLoading, currentCase] = useStore(
    useShallow((state) => [state.initNewCase, state.responseLoading, state.currentCase])
  );
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentCase){
      navigate("/CaseNavigator")
    }
  },[])

  const handleInitNewCase = async () => {
    if (!(title && description)) {
      alert('Insufficient information: Kindly fill all the details given below');
      return;
    }
    await initNewCase(title, description);
    navigate('/CaseNavigator');
    alert(
      `Welcome to your Case Navigator!\n\nThe Case Navigator will streamline the process into five key sections to guide you step-by-step!\n
      Case Filing: Begin by collecting all necessary client details, selecting the case type, and submitting required documents to officially start the case.
      Evidence Collection: Gather and upload critical evidence, such as physical or digital items, and ensure it is properly verified.
      Legal Research: Explore relevant laws, past cases, and legal precedents to build a strong foundation for your case.
      Hearing Preparation: Get ready for court hearings by organizing agendas, required documents, and tracking hearing schedules.
      Case Resolution: Finalize the case by submitting the judgment, summarizing outcomes, and identifying any follow-up actions like appeals or settlements.`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-background border-2 border-primary rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-secondary border-none cursor-pointer"
          >
            &larr;
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">New Case</h1>
            <p className="text-gray-600">Add case details below!</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-lg font-semibold mb-2">Case Title</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter case title"
            className="w-full p-3 border rounded-lg border-gray-300 resize-none mb-4"
          />

          <label className="block text-gray-800 text-lg font-semibold mb-2">Case Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Give a brief description of your case!"
            className="w-full p-3 border rounded-lg border-gray-300 resize-none min-h-[100px]"
          />
        </div>

        <button
          onClick={handleInitNewCase}
          className={`w-full p-4 rounded-lg bg-primary text-white border-none ${
            responseLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={responseLoading}
        >
          <span className="text-lg font-semibold">
            {responseLoading ? 'Initiating new case' : 'Get Started'}
          </span>
          {responseLoading && <span className="ml-2">⏳</span>}
        </button>
      </div>
    </div>
  );
};

export default NewCase;
