import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

interface AccountProps {
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/"); // Redirects user to the homepage if they cancel
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F4EEE4" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl shadow-lg p-8 text-center"
        style={{ backgroundColor: "#241C1A" }} 
      >
        {/* Lottie Animation */}
        <div className="flex justify-center mb-6">
          <Player
            autoplay
            loop
            src="https://lottie.host/93b1960b-21b9-4669-a10e-1fdc0021c45d/jUFSex4AWd.json" 
            style={{ height: "150px", width: "150px" }}
          />
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "#EBD9CD" }} 
        >
          Oh no! You’re leaving...
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm mb-6"
          style={{ color: "#EBD9CD" }} 
        >
          Are you sure you want to log out?
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleCancel}
            className="w-full py-3 rounded-lg font-semibold transition duration-300"
            style={{
              backgroundColor: "#507680", 
              color: "#F4EEE4",
            }}
          >
            Nah, Just Kidding
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg font-semibold border transition duration-300"
            style={{
              backgroundColor: "#452B01",
              color: "#F4EEE4", 
              borderColor: "#EBD9CD", 
              borderWidth: "2px",
            }}
          >
            Yes, Log Me Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
