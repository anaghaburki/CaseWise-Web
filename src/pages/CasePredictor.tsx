import React, { useState } from "react";
import useStore from '../store/useStore';

const CasePredictor: React.FC = () => {
  const { getCasePrediction, casePrediction, responseLoading } = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (selectedFile) {
      await getCasePrediction(selectedFile);
    } else {
      alert("Please select a file to predict.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Case Predictor</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload a PDF file:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      <button
        onClick={handlePredict}
        disabled={responseLoading}
        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
          responseLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {responseLoading ? "Processing..." : "Get Prediction"}
      </button>

      {casePrediction && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Prediction Result:</h2>
          <pre className="text-sm text-gray-700 overflow-auto">
            {JSON.stringify(casePrediction, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CasePredictor;
