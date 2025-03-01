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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 overflow-hidden pt-24">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 space-y-6 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
        <h1 className="text-4xl font-black text-primary mb-6 text-center tracking-tight">
          Case Prediction AI
        </h1>

        <div className="mb-6">
          <textarea
            className="w-full h-40 p-4 border-2 border-darkbg/10 rounded-2xl bg-bg/50 focus:outline-none focus:ring-4 focus:ring-tertiary/50 transition-all duration-300 ease-in-out resize-none text-darkbg text-base font-medium"
            placeholder="Enter detailed case information here..."
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
          />
        </div>

        <div className='flex-row flex items-center space-x-3'>
          <button
            className={`w-full px-6 py-3 font-bold rounded-2xl transition-all duration-300 ease-in-out text-lg
            ${isLoading || !caseDetails.trim()
                ? 'bg-darkbg/10 text-darkbg/50 cursor-not-allowed'
                : 'bg-tertiary text-white hover:bg-tertiary/90 hover:shadow-lg transform hover:scale-[1.01]'}`}
            onClick={handleDescAnalyze}
            disabled={isLoading || !caseDetails.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Predict Case Outcome'}
          </button>
          <label className={`w-full px-6 py-3 font-bold rounded-2xl transition-all duration-300 ease-in-out text-lg
            ${isLoading || !caseDetails.trim()
              ? 'bg-darkbg/10 text-darkbg/50 cursor-not-allowed'
              : 'bg-tertiary text-white hover:bg-tertiary/90 hover:shadow-lg transform hover:scale-[1.01]'}`}>
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
            <div className="animate-pulse w-16 h-16 bg-tertiary/50 rounded-full"></div>
          </div>
        )}

        {prediction && !isLoading && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Overall Prediction Card */}
              <div className="md:col-span-2 bg-bg shadow-lg rounded-2xl p-6 border border-darkbg/10">
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-darkbg/20 pb-2">
                  Prediction Overview
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-darkbg">Predicted Outcome</p>
                      <p className="text-green-700 font-bold text-xl">{prediction.predictedOutcome}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-darkbg">Confidence Level</p>
                      <p className="text-tertiary font-bold text-xl">{prediction.predictionConfidence}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-darkbg">Risk Level</p>
                      <p className="text-red-700 font-bold text-xl">{prediction.riskLevel}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-darkbg">Success Rate</p>
                      <p className="text-tertiary font-bold text-xl">{prediction.successRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Cards */}
              <div className="bg-bg shadow-lg rounded-2xl p-6 border border-darkbg/10">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-darkbg/20 pb-2">
                  Potential Rewards
                </h3>
                <p className="text-green-800 font-bold text-lg">{prediction.potentialRewards}</p>
              </div>

              <div className="bg-bg shadow-lg rounded-2xl p-6 border border-darkbg/10">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-darkbg/20 pb-2">
                  Key Factors
                </h3>
                <ul className="space-y-2">
                  {prediction.keyFactors?.map((factor:any, index:any) => (
                    <li key={index} className="flex items-center text-darkbg">
                      <span className="mr-3 text-tertiary font-bold">•</span>
                      <span className="font-medium">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg shadow-lg rounded-2xl p-6 border border-darkbg/10">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-darkbg/20 pb-2">
                  Improvement Strategies
                </h3>
                <ul className="space-y-2">
                  {prediction.improvementStrategies?.map((strategy: any, index: any) => (
                    <li key={index} className="flex items-center text-darkbg">
                      <span className="mr-3 text-green-600 font-bold">•</span>
                      <span className="font-medium">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg shadow-lg rounded-2xl p-6 border border-darkbg/10">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-darkbg/20 pb-2">
                  Uncertainty Factors
                </h3>
                <ul className="space-y-2">
                  {prediction.uncertaintyFactors?.map((factor: any, index: any) => (
                    <li key={index} className="flex items-center text-darkbg">
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

