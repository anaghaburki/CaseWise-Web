import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface GoogleSignInProps {
  onSignIn: (userInfo: any) => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignIn }) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      onSignIn(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
