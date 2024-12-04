import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';

interface CasePrediction {
  predictedOutcome: string | null;
  predictionConfidence: 'Low' | 'Medium' | 'High' | null;
  keyFactors: string[] | null;
  improvementStrategies: string[] | null;
  riskLevel: 'Low' | 'Medium' | 'High' | null;
  potentialRewards: string | null;
  uncertaintyFactors: string[] | null;
  successRate: number | null;
}

const CasePredictor: React.FC = () => {
  const [caseDetails, setCaseDetails] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [prediction, getCasePrediction, isLoading] = useStore(
    useShallow((state)=>[state.casePrediction, state.getCasePrediction, state.responseLoading])
  )

  const handleDescAnalyze = async () => {
    if(caseDetails){
      await getCasePrediction(null,caseDetails)
    }
  }

  const handlePredict = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      await getCasePrediction(file, "");
    }
  }

  return (
    <div className="min-h-screen bg-[#F4EEE4] flex flex-col items-center justify-center p-4 overflow-hidden pt-24 font-['ClashDisplay']">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 space-y-6 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
        <h1 className="text-4xl font-black text-[#452B01] mb-6 text-center tracking-tight">
          Case Prediction AI
        </h1>

        <div className="mb-6">
          <textarea
            className="w-full h-40 p-4 border-2 border-[#241C1A]/10 rounded-2xl bg-[#F4EEE4]/50 focus:outline-none focus:ring-4 focus:ring-[#507680]/50 transition-all duration-300 ease-in-out resize-none text-[#241C1A] text-base font-medium"
            placeholder="Enter detailed case information here..."
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
          />
        </div>

        <div className='flex-row flex items-center space-x-3'>
          <button
            className={`w-full px-6 py-3 font-bold rounded-2xl transition-all duration-300 ease-in-out text-lg
            ${isLoading || !caseDetails.trim()
                ? 'bg-[#241C1A]/10 text-[#241C1A]/50 cursor-not-allowed'
                : 'bg-[#507680] text-white hover:bg-[#507680]/90 hover:shadow-lg transform hover:scale-[1.01]'}`}
            onClick={handleDescAnalyze}
            disabled={isLoading || !caseDetails.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Predict Case Outcome'}
          </button>
          <label className={`w-full px-6 py-3 font-bold rounded-2xl transition-all duration-300 ease-in-out text-lg
            ${isLoading || !caseDetails.trim()
              ? 'bg-[#241C1A]/10 text-[#241C1A]/50 cursor-not-allowed'
              : 'bg-[#507680] text-white hover:bg-[#507680]/90 hover:shadow-lg transform hover:scale-[1.01]'}`}>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePredict}
              aria-label="Upload PDF file"
              className="hidden"
            />
            Your Legal Documents go Here!
          </label>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-6">
            <div className="animate-pulse w-16 h-16 bg-[#507680]/50 rounded-full"></div>
          </div>
        )}

        {prediction && !isLoading && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Overall Prediction Card */}
              <div className="md:col-span-2 bg-[#F4EEE4] shadow-lg rounded-2xl p-6 border border-[#241C1A]/10">
                <h2 className="text-2xl font-bold text-[#452B01] mb-4 border-b border-[#241C1A]/20 pb-2">
                  Prediction Overview
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#241C1A]">Predicted Outcome</p>
                      <p className="text-green-700 font-bold text-xl">{prediction.predictedOutcome}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#241C1A]">Confidence Level</p>
                      <p className="text-[#507680] font-bold text-xl">{prediction.predictionConfidence}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#241C1A]">Risk Level</p>
                      <p className="text-red-700 font-bold text-xl">{prediction.riskLevel}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#241C1A]">Success Rate</p>
                      <p className="text-[#507680] font-bold text-xl">{prediction.successRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Cards */}
              <div className="bg-[#F4EEE4] shadow-lg rounded-2xl p-6 border border-[#241C1A]/10">
                <h3 className="text-xl font-bold text-[#452B01] mb-4 border-b border-[#241C1A]/20 pb-2">
                  Potential Rewards
                </h3>
                <p className="text-green-800 font-bold text-lg">{prediction.potentialRewards}</p>
              </div>

              <div className="bg-[#F4EEE4] shadow-lg rounded-2xl p-6 border border-[#241C1A]/10">
                <h3 className="text-xl font-bold text-[#452B01] mb-4 border-b border-[#241C1A]/20 pb-2">
                  Key Factors
                </h3>
                <ul className="space-y-2">
                  {prediction.keyFactors?.map((factor:any, index:any) => (
                    <li key={index} className="flex items-center text-[#241C1A]">
                      <span className="mr-3 text-[#507680] font-bold">•</span>
                      <span className="font-medium">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F4EEE4] shadow-lg rounded-2xl p-6 border border-[#241C1A]/10">
                <h3 className="text-xl font-bold text-[#452B01] mb-4 border-b border-[#241C1A]/20 pb-2">
                  Improvement Strategies
                </h3>
                <ul className="space-y-2">
                  {prediction.improvementStrategies?.map((strategy: any, index: any) => (
                    <li key={index} className="flex items-center text-[#241C1A]">
                      <span className="mr-3 text-green-600 font-bold">•</span>
                      <span className="font-medium">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F4EEE4] shadow-lg rounded-2xl p-6 border border-[#241C1A]/10">
                <h3 className="text-xl font-bold text-[#452B01] mb-4 border-b border-[#241C1A]/20 pb-2">
                  Uncertainty Factors
                </h3>
                <ul className="space-y-2">
                  {prediction.uncertaintyFactors?.map((factor: any, index: any) => (
                    <li key={index} className="flex items-center text-[#241C1A]">
                      <span className="mr-3 text-red-600 font-bold">•</span>
                      <span className="font-medium">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasePredictor;
