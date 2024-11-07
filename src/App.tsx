import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContractSummarizer from './pages/ContractSummarizer';
import LawBot from './pages/LawBot';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContractSummarizer />} />
        <Route path="/lawbot" element = {<LawBot/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;