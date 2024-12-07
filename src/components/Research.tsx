import React from 'react';
import { useShallow } from 'zustand/shallow';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Research: React.FC = () => {
  const [currentCase] = useStore(
    useShallow((state) => [state.currentCase])
  );
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-3 bg-secondary"
          aria-label="Go back"
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl text-darkbg font-bold">Research Findings</h1>
          <p className="text-base text-darkbg">View and manage research</p>
        </div>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {currentCase?.legalResearch && currentCase.legalResearch.length > 0 ? (
          currentCase.legalResearch.map((item: { topic: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; notes: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; precedentCase: { caseTitle: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; caseSummary: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rulingDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; court: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }, index: React.Key | null | undefined) => (
            <div key={index} className="bg-secondary my-1 rounded-xl p-5">
              {item.topic && (
                <p className="font-semibold text-darkbg text-lg">
                  Topic: <span className="font-normal">{item.topic}</span>
                </p>
              )}
              {item.notes && (
                <p className="text-darkbg font-semibold">
                  Notes: <span className="font-normal">{item.notes}</span>
                </p>
              )}
              {item.precedentCase.caseTitle && (
                <p className="text-darkbg font-semibold">
                  Title: <span className="font-normal">{item.precedentCase.caseTitle}</span>
                </p>
              )}
              {item.precedentCase.caseSummary && (
                <p className="text-darkbg font-semibold">
                  Summary: <span className="font-normal">{item.precedentCase.caseSummary}</span>
                </p>
              )}
              {item.precedentCase.rulingDate && (
                <p className="text-darkbg font-semibold">
                  Ruling Date: <span className="font-normal">{item.precedentCase.rulingDate}</span>
                </p>
              )}
              {item.precedentCase.court && (
                <p className="text-darkbg font-semibold">
                  Court: <span className="font-normal">{item.precedentCase.court}</span>
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-darkbg font-semibold">No research findings available.</p>
        )}
      </div>
      <div className="h-[60px]"></div>
    </div>
  );
};

export default Research;
