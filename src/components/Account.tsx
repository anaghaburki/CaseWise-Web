import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountProps {
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate("/"); 
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Account</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
