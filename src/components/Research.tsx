import React from 'react';
import { useShallow } from 'zustand/shallow';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const Research: React.FC = () => {
  const [currentCase] = useStore(
    useShallow((state) => [state.currentCase])
  );
  const navigate = useNavigate();

  return (
    <div className="bg-bg min-h-screen p-5">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => navigate("/CaseNavigator")}
          className="rounded-full p-3 bg-secondary"
        >
          <MdArrowBack size={25} />
        </button>
        <div>
          <h1 className="text-xl text-darkbg font-bold">Research Findings</h1>
          <p className="text-base text-darkbg">View and manage research</p>
        </div>
      </div>

      <div className="overflow-y-auto mt-5" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {currentCase?.legalResearch?.map((item, index) => (
          <div key={index} className="bg-secondary my-1 rounded-xl p-5">
            {item?.topic && (
              <p className="font-semibold text-darkbg text-lg">
                Topic: {item.topic}
              </p>
            )}
            {item?.notes && (
              <p className="text-darkbg font-semibold">
                Notes: <span className="font-normal">{item.notes}</span>
              </p>
            )}
            {item?.precedentCases?.caseTitle && (
              <p className="text-darkbg font-semibold">
                Title: <span className="font-normal">{item.precedentCases.caseTitle}</span>
              </p>
            )}
            {item?.precedentCases?.caseSummary && (
              <p className="text-darkbg font-semibold">
                Summary: <span className="font-normal">{item.precedentCases.caseSummary}</span>
              </p>
            )}
            {item?.precedentCases?.rulingDate && (
              <p className="text-darkbg font-semibold">
                Ruling Date: <span className="font-normal">{item.precedentCases.rulingDate}</span>
              </p>
            )}
            {item?.precedentCases?.court && (
              <p className="text-darkbg font-semibold">
                Court: <span className="font-normal">{item.precedentCases.court}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="h-[60px]" />
    </div>
  );
};

export default Research;
