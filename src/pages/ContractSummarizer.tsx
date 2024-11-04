import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { documentPrompt } from "../utils/prompts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const ContractSummarizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [parsedResponse, setParsedResponse] = useState<any>(null);

  const getDocumentAnalysis = async (file: File) => {
    setLoading(true);
    setError('');
    setResponseText('');

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const chat = model.startChat({});
      const reader = new FileReader();

      reader.onloadend = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const base64String = arrayBufferToBase64(arrayBuffer);
        const pdf = {
          inlineData: {
            data: base64String,
            mimeType: "application/pdf",
          },
        };

        setTimeout(async () => {
          const result = await chat.sendMessage([documentPrompt, pdf]);
          const jsonResponse = JSON.parse(result.response.text());
          setParsedResponse(jsonResponse);
          setLoading(false);
        }, 3000);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      setError('Error processing the document. Please try again.');
      console.error(error);
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      getDocumentAnalysis(file);
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const byteArray = new Uint8Array(buffer);
    const binaryString = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return window.btoa(binaryString);
  };

  return (
    <div className="bg-bg p-5 rounded-lg flex flex-col items-center justify-center min-h-screen text-center">
      {loading ? (
        <div className="flex flex-col items-center">
          <iframe 
            src="https://lottie.host/embed/664e2d91-88d2-4c2b-9c35-e02dd8c7d6de/deYjWqiKor.json" 
            width="300" 
            height="300" 
            className="border-none mb-5" 
            title="Loading Animation">
          </iframe>
          <p className="text-primary text-lg">Hang tight, Analyzing...</p>
        </div>
      ) : (
        <>
          {!selectedFile && !parsedResponse && (
            <>
              <h1 className="text-primary text-2xl">Contract Summarizer</h1>
              <p className="text-primary text-xl mb-5">We read between the lines so you don't have to</p>
              <iframe 
                src="https://lottie.host/embed/5f065666-33fa-4aa5-a350-156ec2e4e563/IVFabssVfX.json" 
                width="300" 
                height="300" 
                className="border-none mb-5" 
                title="Contract Animation" />
              <label className="custom-file-upload bg-primary text-secondary py-2 px-4 rounded cursor-pointer inline-block mt-5">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  aria-label="Upload PDF file"
                  className="hidden"
                />
                Choose File
              </label>
            </>
          )}

          {parsedResponse && !loading && (
            <div className="flex flex-col gap-4 mt-5 w-full">
              <div className="bg-primary p-4 rounded-lg shadow-lg">
                <h2 className="text-white font-semibold">Document Summary</h2>
                <p className="text-white"><strong>Document Name:</strong> {parsedResponse.document_name || 'N/A'}</p>
                <p className="text-white"><strong>Document Type:</strong> {parsedResponse.document_type || 'N/A'}</p>
                
                <div className="flex justify-between gap-4 mt-4">
                  <div className="bg-black p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-white font-semibold">Effective Date</h3>
                    <p className="text-white">{parsedResponse.effective_date || 'N/A'}</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-white font-semibold">Termination Date</h3>
                    <p className="text-white">{parsedResponse.termination_date || 'N/A'}</p>
                  </div>
                </div>

                <p className="text-white"><strong>Parties Involved:</strong> {parsedResponse.parties_involved.length > 0 ? parsedResponse.parties_involved.join(', ') : 'N/A'}</p>
              </div>

              <div className="flex justify-between gap-4">
                <div className="bg-tertiary p-4 rounded-lg shadow-lg w-full">
                  <h2 className="text-xl font-semibold">Key Terms</h2>
                  <p className="text-gray-800"><strong>Description:</strong> {parsedResponse.key_terms.description || 'N/A'}</p>
                  <h4 className="text-lg font-semibold">Terms:</h4>
                  <ul className="list-disc list-inside">
                    {parsedResponse.key_terms.terms.length > 0 ? (
                      parsedResponse.key_terms.terms.map((term: { term: string; importance: string }, index: number) => (
                        <li key={index}>
                          <strong>{term.term || 'N/A'}:</strong> {term.importance || 'N/A'}
                        </li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </div>

                <div className="bg-tertiary p-4 rounded-lg shadow-lg w-full">
                  <h2 className="text-xl font-semibold">Obligations</h2>
                  {parsedResponse.obligations.length > 0 ? (
                    parsedResponse.obligations.map((obligation: { obligation: string; description: string; due_date: string | null }, index: number) => (
                      <div key={index} className="mb-2">
                        <p><strong>Obligation:</strong> {obligation.obligation || 'N/A'}</p>
                        <p><strong>Description:</strong> {obligation.description || 'N/A'}</p>
                        <p><strong>Due Date:</strong> {obligation.due_date || 'N/A'}</p>
                      </div>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>

              <div className="bg-red-200 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Risks</h2>
                {parsedResponse.risks.general.length > 0 ? (
                  parsedResponse.risks.general.map((risk: { risk: string; impact: string; likelihood: string; concerning: boolean }, index: number) => (
                    <div key={index} className="mb-2">
                      <p><strong>Risk:</strong> {risk.risk || 'N/A'}</p>
                      <p><strong>Impact:</strong> {risk.impact || 'N/A'}</p>
                      <p><strong>Likelihood:</strong> {risk.likelihood || 'N/A'}</p>
                      <p><strong>Concerning:</strong> {risk.concerning ? 'Yes' : 'No'}</p>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="bg-red-200 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Shady Clauses</h2>
                {parsedResponse.shady_clauses.length > 0 ? (
                  parsedResponse.shady_clauses.map((clause: { clause: string; description: string; reason: string; potential_impact: string }, index: number) => (
                    <div key={index} className="mb-2">
                      <p><strong>Clause:</strong> {clause.clause || 'N/A'}</p>
                      <p><strong>Description:</strong> {clause.description || 'N/A'}</p>
                      <p><strong>Reason:</strong> {clause.reason || 'N/A'}</p>
                      <p><strong>Potential Impact:</strong> {clause.potential_impact || 'N/A'}</p>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Action Items</h2>
                {parsedResponse.action_items.length > 0 ? (
                  parsedResponse.action_items.map((item: { action: string; deadline: string | null }, index: number) => (
                    <div key={index} className="mb-2">
                      <p><strong>Action Item:</strong> {item.action || 'N/A'}</p>
                      <p><strong>Deadline:</strong> {item.deadline || 'N/A'}</p>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Dispute Resolution</h2>
                <p><strong>Method:</strong> {parsedResponse.dispute_resolution.method || 'N/A'}</p>
                <p><strong>Jurisdiction:</strong> {parsedResponse.dispute_resolution.jurisdiction || 'N/A'}</p>
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Termination Conditions</h2>
                {parsedResponse.termination_conditions.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {parsedResponse.termination_conditions.map((condition: string, index: number) => (
                      <li key={index}>{condition || 'N/A'}</li>
                    ))}
                  </ul>
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="flex justify-between gap-4">
                <div className="bg-tertiary p-4 rounded-lg shadow-lg flex-1">
                  <h2 className="text-xl font-semibold">Review Recommendations</h2>
                  <p>{parsedResponse.review_recommendations || 'N/A'}</p>
                </div>

                <div className="bg-tertiary p-4 rounded-lg shadow-lg flex-1">
                  <h2 className="text-xl font-semibold">User Protection Tips</h2>
                  <p>{parsedResponse.user_protection_tips || 'N/A'}</p>
                </div>

                <div className="bg-tertiary p-4 rounded-lg shadow-lg flex-1">
                  <h2 className="text-xl font-semibold">Overall Analysis</h2>
                  <p>{parsedResponse.overall_analysis || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ContractSummarizer;
