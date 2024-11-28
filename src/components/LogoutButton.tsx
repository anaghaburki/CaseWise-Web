import React from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
