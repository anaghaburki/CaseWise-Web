import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';

const ContractSummarizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, getDocumentAnalysis, parsedResponse] = useStore(
    useShallow((state) => [state.responseLoading, state.getDocumentAnalysis, state.documentAnalysis])
  );

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
            title="Loading Animation"
          ></iframe>
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
                title="Contract Animation"
              />
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
              <div className="w-full max-w-4xl mx-auto space-y-6 mt-20">

                {/* Document Info */}
                <div className="bg-darkbg shadow-md rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-bg">Document Information</h2>
                  <p className="text-bg text-start">Name: {parsedResponse.document_name}</p>
                  <p className="text-bg text-start">Type: {parsedResponse.document_type}</p>
                  <p className="text-bg text-start">Parties Involved: {parsedResponse.parties_involved?.join(", ")}</p>
                  <p className="text-bg text-start">Effective Date: {parsedResponse.effective_date}</p>
                  <p className="text-bg text-start">Termination Date: {parsedResponse.termination_date}</p>
                </div>

                {/* Key Terms */}
                {parsedResponse.key_terms && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary">Key Terms</h2>
                    <p className="text-darkbg">{parsedResponse.key_terms.description}</p>
                    {parsedResponse.key_terms.terms?.map((term, index) => (
                      <div key={index} className="bg-bg rounded p-4 my-2">
                        <p className="text-darkbg text-start font-bold">Term: {term.term}</p>
                        <p className="text-darkbg text-start">Importance: {term.importance}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Obligations */}
                {parsedResponse.obligations && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary">Obligations</h2>
                    {parsedResponse.obligations.map((obligation, index) => (
                      <div key={index} className="bg-bg rounded p-4 my-2">
                        <p className="text-darkbg text-start font-bold">Obligation: {obligation.obligation}</p>
                        <p className="text-darkbg text-start">Description: {obligation.description}</p>
                        <p className="text-darkbg text-start">Due Date: {obligation.due_date}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Risks */}
                {parsedResponse.risks && (
                  <div className="bg-red-300 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary">Risks</h2>
                    {Object.entries(parsedResponse.risks).map(([riskType, risks], index) => (
                      <div key={index} className="mt-4">
                        <h3 className="text-xl font-semibold text-darkbg capitalize">{riskType} Risks</h3>
                        {risks?.map((risk, i) => (
                          <div key={i} className="bg-bg rounded p-4 my-2">
                            <p className="text-darkbg  text-start font-bold">Risk: {risk.risk}</p>
                            <p className="text-darkbg text-start ">Impact: {risk.impact}</p>
                            <p className="text-darkbg text-start ">Likelihood: {risk.likelihood}</p>
                            <p className="text-darkbg text-start ">Concerning: {risk.concerning ? "Yes" : "No"}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Shady Clauses */}
                {parsedResponse.shady_clauses && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary">Shady Clauses</h2>
                    {parsedResponse.shady_clauses.map((clause, index) => (
                      <div key={index} className="bg-bg rounded p-4 my-2">
                        <p className="text-darkbg text-start">Clause: {clause.clause}</p>
                        <p className="text-darkbg text-start">Description: {clause.description}</p>
                        <p className="text-darkbg text-start">Reason: {clause.reason}</p>
                        <p className="text-darkbg text-start">Potential Impact: {clause.potential_impact}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Items */}
                {parsedResponse.action_items && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary">Action Items</h2>
                    {parsedResponse.action_items.map((action, index) => (
                      <div key={index} className="bg-bg rounded p-4 my-2">
                        <p className="text-darkbg text-start font-bold">Action: {action.action}</p>
                        <p className="text-darkbg text-start">Deadline: {action.deadline? action.deadline : "N/A"}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dispute Resolution */}
                {parsedResponse.dispute_resolution && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary text-start">Dispute Resolution</h2>
                    <p className="text-darkbg text-start">Method: {parsedResponse.dispute_resolution.method}</p>
                    <p className="text-darkbg text-start">Jurisdiction: {parsedResponse.dispute_resolution.jurisdiction}</p>
                  </div>
                )}

                {/* Termination Conditions */}
                {parsedResponse.termination_conditions && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary text-start">Termination Conditions</h2>
                    <ul className="list-disc list-inside text-darkbg text-start">
                      {parsedResponse.termination_conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Review Recommendations */}
                {parsedResponse.review_recommendations && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary text-start">Review Recommendations</h2>
                    <p className="text-darkbg text-start">{parsedResponse.review_recommendations}</p>
                  </div>
                )}

                {/* User Protection Tips */}
                {parsedResponse.user_protection_tips && (
                  <div className="bg-secondary shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-primary text-start">User Protection Tips</h2>
                    <p className="text-darkbg text-start">{parsedResponse.user_protection_tips}</p>
                  </div>
                )}

                {/* Overall Analysis */}
                {parsedResponse.overall_analysis && (
                  <div className="bg-secondary shadow-md rounded-lg p-6 text-start">
                    <h2 className="text-2xl font-semibold text-primary">Overall Analysis</h2>
                    <p className="text-darkbg">{parsedResponse.overall_analysis}</p>
                  </div>
                )}
              </div>
            )}

        </>
      )}
    </div>
  );
};

export default ContractSummarizer;
