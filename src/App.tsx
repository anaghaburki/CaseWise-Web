import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractSummarizer from "./pages/ContractSummarizer";
import LawBot from "./pages/LawBot";
import { useEffect, useState } from "react";
import { NavItem } from "./components/NavItems";
import useStore from "./store/useStore";
import { useShallow } from "zustand/shallow";
import GoogleSignIn from "./components/GoogleSignIn";
import Account from "./components/Account";
import { initialPrompt } from "./utils/prompts";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import CasePredictor from "./pages/CasePredictor";
import NewCase from "./components/NewCase";
import CaseNavigator from "./pages/CaseNavigator";
import Evidence from "./components/Evidence";
import Hearing from "./components/Hearing";
import Research from "./components/Research";
import Home from "./pages/Home";

const App = () => {
  const [loadInitialPrompt] = useStore(
    useShallow((state) => [state.loadInitialPrompt])
  );

  const [activeItem, setActiveItem] = useState("Home");
  const [user, setUser] = useState<User | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const screens = [
    { name: "Home", path: "/Home" },
    { name: "Summarizer", path: "/Summarizer" },
    { name: "Predictor", path: "/Predictor" },
    { name: "Navigator", path: "/NewCase" },
    { name: "Lawbot", path: "/Lawbot" },
    { name: "Account", path: "/Account" },
  ];

  useEffect(() => {
    loadInitialPrompt();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = (userInfo: User) => {
    setUser(userInfo);
    setShowSignIn(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowSignIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleGetStarted = () => {
    setShowSignIn(true);
  };

  if (!showSignIn && !user) {
    return <Home onGetStarted={handleGetStarted} />;
  }

  if (showSignIn && !user) {
    return <GoogleSignIn onSignIn={handleSignIn} />;
  }

  return (
    <BrowserRouter>
      <div className="flex self-center left-1/2 -translate-x-1/2 flex-row rounded-full gap-2 p-1 top-4 absolute bg-darkbg">
        {screens.map((item) => (
          <NavItem
            key={item.name}
            label={item.name}
            isActive={activeItem === item.name}
            onClick={() => setActiveItem(item.name)}
          />
        ))}
      </div>

      <Routes>
        <Route path="/" element={<Home onGetStarted={handleGetStarted} />} />
        <Route path="/Home" element={<Home onGetStarted={handleGetStarted} />} />
        <Route path="/Summarizer" element={<ContractSummarizer />} />
        <Route path="/Lawbot" element={<LawBot />} />
        <Route path="/Account" element={<Account onLogout={handleLogout} />} />
        <Route path="/Predictor" element={<CasePredictor />} />
        <Route path="/Navigator" element={<NewCase />} />
        <Route path="/NewCase" element={<NewCase />} />
        <Route path="/Evidence" element={<Evidence />} />
        <Route path="/CaseNavigator" element={<CaseNavigator />} />
        <Route path="/Hearing" element={<Hearing />} />
        <Route path="/Research" element={<Research />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;