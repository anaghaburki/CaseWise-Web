import React from 'react';
import { useNavigate } from 'react-router-dom';

const CaseNavigator: React.FC = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Case Navigator</h1>
      
      <button
        onClick={() => navigate('/NewCase')} 
        className="p-3 bg-primary rounded-full text-white"
      >
        +
      </button>
    </div>
  );
};

export default CaseNavigator;
