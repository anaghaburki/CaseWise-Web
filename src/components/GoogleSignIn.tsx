import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Player } from "@lottiefiles/react-lottie-player";

interface GoogleSignInProps {
  onSignIn: (userInfo: any) => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignIn }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already signed in:", user);
        onSignIn(user);
      }
    });

    return () => unsubscribe();
  }, [onSignIn]);

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
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center p-4">
      <div className="bg-secondary rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to CaseWise</h1>
          <p className="text-darkbg">Sign in to access your intelligent legal assistant</p>
        </div>

        {/* Lottie Animation */}
        <div className="mb-8">
          <Player
            autoplay
            loop
            src="https://lottie.host/240dabcd-1889-48fe-82a9-428d32a95672/LafD75I5Cg.json"
            style={{ height: "200px", width: "200px" }}
          />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-tertiary hover:bg-primary text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-lg shadow-md"
        >
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </div>
        </button>

        <p className="mt-6 text-center text-sm text-darkbg">
          By signing in, you agree to our <a href="#" className="text-tertiary hover:underline">Terms of Service</a> and <a href="#" className="text-tertiary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default GoogleSignIn;
