import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';

const ContractSummarizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, getDocumentAnalysis, parsedResponse, error] = useStore(
    useShallow((state) => [state.responseLoading, state.getDocumentAnalysis, state.documentAnalysis, state.error])
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      getDocumentAnalysis(file);
    }
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
                <p className="text-white"><strong>Document Name:</strong> {parsedResponse.document_name ?? 'N/A'}</p>
                <p className="text-white"><strong>Document Type:</strong> {parsedResponse.document_type ?? 'N/A'}</p>

                <div className="flex justify-between gap-4 mt-4">
                  <div className="bg-black p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-white font-semibold">Effective Date</h3>
                    <p className="text-white">{parsedResponse.effective_date ?? 'N/A'}</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-white font-semibold">Termination Date</h3>
                    <p className="text-white">{parsedResponse.termination_date ?? 'N/A'}</p>
                  </div>
                </div>

                <p className="text-white"><strong>Parties Involved:</strong> {parsedResponse.parties_involved?.length ? parsedResponse.parties_involved.join(', ') : 'N/A'}</p>
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-semibold">Key Terms</h2>
                <p className="text-gray-800"><strong>Description:</strong> {parsedResponse.key_terms?.description ?? 'N/A'}</p>
                <h4 className="text-lg font-semibold">Terms:</h4>
                <ul className="list-disc list-inside">
                  {parsedResponse.key_terms?.terms?.length ? (
                    parsedResponse.key_terms.terms.map((term, index) => (
                      <li key={index}>
                        <strong>{term.term ?? 'N/A'}:</strong> {term.importance ?? 'N/A'}
                      </li>
                    ))
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </div>

              <div className="bg-red-200 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Risks</h2>
                {parsedResponse.risks?.general?.length ? (
                  parsedResponse.risks.general.map((risk, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>Risk:</strong> {risk.risk ?? 'N/A'}</p>
                      <p><strong>Impact:</strong> {risk.impact ?? 'N/A'}</p>
                      <p><strong>Likelihood:</strong> {risk.likelihood ?? 'N/A'}</p>
                      <p><strong>Concerning:</strong> {risk.concerning ? 'Yes' : 'No'}</p>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Obligations</h2>
                {parsedResponse.obligations?.length ? (
                  parsedResponse.obligations.map((obligation, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>Obligation:</strong> {obligation.obligation ?? 'N/A'}</p>
                      <p><strong>Description:</strong> {obligation.description ?? 'N/A'}</p>
                      <p><strong>Due Date:</strong> {obligation.due_date ?? 'N/A'}</p>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className="bg-tertiary p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Dispute Resolution</h2>
                <p><strong>Method:</strong> {parsedResponse.dispute_resolution?.method ?? 'N/A'}</p>
                <p><strong>Jurisdiction:</strong> {parsedResponse.dispute_resolution?.jurisdiction ?? 'N/A'}</p>
              </div>

              <div className="flex justify-between gap-4">
                <div className="bg-tertiary p-4 rounded-lg shadow-lg flex-1">
                  <h2 className="text-xl font-semibold">Review Recommendations</h2>
                  <p>{parsedResponse.review_recommendations ?? 'N/A'}</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg shadow-lg flex-1">
                  <h2 className="text-xl font-semibold">User Protection Tips</h2>
                  <p>{parsedResponse.user_protection_tips ?? 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContractSummarizer;
