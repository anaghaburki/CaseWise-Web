import React, { useState } from 'react';

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
  const [prediction, setPrediction] = useState<CasePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockPrediction: CasePrediction = {
        predictedOutcome: 'Favorable',
        predictionConfidence: 'High',
        keyFactors: ['Key witness testimony', 'Strong documentary evidence'],
        improvementStrategies: ['Enhance cross-examination', 'Gather more supporting documents'],
        riskLevel: 'Low',
        potentialRewards: 'Significant financial compensation',
        uncertaintyFactors: ['Witness credibility', 'Unexpected legal precedents'],
        successRate: 85,
      };
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Case Prediction</h1>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter case details here..."
          value={caseDetails}
          onChange={(e) => setCaseDetails(e.target.value)}
        />
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          onClick={handleAnalyze}
          disabled={isLoading || !caseDetails.trim()}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Case'}
        </button>

        {isLoading && (
          <div className="flex justify-center items-center mt-6">
            <p>Loading...</p>
          </div>
        )}

        {prediction && !isLoading && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-700">Prediction Results</h2>
            <div className="mt-4 space-y-4">
              <p><strong>Predicted Outcome:</strong> {prediction.predictedOutcome}</p>
              <p><strong>Confidence Level:</strong> {prediction.predictionConfidence}</p>
              <p><strong>Risk Level:</strong> {prediction.riskLevel}</p>
              <p><strong>Potential Rewards:</strong> {prediction.potentialRewards}</p>
              <p><strong>Success Rate:</strong> {prediction.successRate}%</p>

              <div>
                <strong>Key Factors:</strong>
                <ul className="list-disc list-inside">
                  {prediction.keyFactors?.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Improvement Strategies:</strong>
                <ul className="list-disc list-inside">
                  {prediction.improvementStrategies?.map((strategy, index) => (
                    <li key={index}>{strategy}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Uncertainty Factors:</strong>
                <ul className="list-disc list-inside">
                  {prediction.uncertaintyFactors?.map((factor, index) => (
                    <li key={index}>{factor}</li>
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
