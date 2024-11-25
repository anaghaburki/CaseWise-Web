import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ContractSummarizer from "./pages/ContractSummarizer";
import LawBot from "./pages/LawBot";
import { useEffect, useState } from "react";
import { NavItem } from "./components/NavItems";
import useStore from "./store/useStore";
import { useShallow } from "zustand/shallow";
import GoogleSignIn from "./components/GoogleSignIn";
import { initialPrompt } from "./utils/prompts";

const App = () => {
  const [loadInitialPrompt] = useStore(
    useShallow((state) => [state.loadInitialPrompt])
  );

  const [activeItem, setActiveItem] = useState("Home");
  const [user, setUser] = useState(null); 
  const screens = [
    "Home",
    "Summarizer",
    "Predictor",
    "Research",
    "Glossary",
    "Lawbot",
  ];

  
  useEffect(() => {
    loadInitialPrompt();
  }, []);

  
  const handleSignIn = (userInfo: any) => {
    setUser(userInfo); 
  };

  return (
    <BrowserRouter>
      {!user ? (
        
        <GoogleSignIn onSignIn={handleSignIn} />
      ) : (
        
        <>
          <div className="flex self-center left-1/2 -translate-x-1/2 flex-row rounded-full gap-2 p-1 top-4 absolute bg-darkbg">
            {screens.map((item) => (
              <NavItem
                key={item}
                label={item}
                isActive={activeItem === item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/Summarizer" />} />
            <Route path="/Summarizer" element={<ContractSummarizer />} />
            <Route path="/Lawbot" element={<LawBot />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
