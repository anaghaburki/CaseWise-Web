import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Markdown from 'react-markdown';

const Hearing: React.FC = () => {
  const [currentCase, responseLoading, getHearingAdvice] = useStore(
    useShallow((state) => [state.currentCase, state.responseLoading, state.getHearingAdvice])
  );
  const [advice, setAdvice] = useState<string>('');
  const [adviceRecieved, setAdviceRecieved] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleGetAdvice = async () => {
    if (!adviceRecieved) {
      const advice = await getHearingAdvice(currentCase!!);
      setAdvice(advice);
      setAdviceRecieved(true);
    }
  };

  return (
    <div className="bg-bg px-4 min-h-screen">
      <div className="flex items-center gap-3 py-4">
        <button
          onClick={() => {
            navigate("/CaseNavigator")
          }}
          className="rounded-full p-3 bg-secondary"
        >
          <MdArrowBack size={25} />
        </button>
        <div>
          <h1 className="text-xl text-darkbg font-bold">Hearing List</h1>
          <p className="text-base text-darkbg">View and manage hearings</p>
        </div>
      </div>
      <div className="space-y-3">
        {currentCase?.hearingManagement?.length ? (
          currentCase.hearingManagement.map((item, index) => (
            <div key={index} className="bg-secondary my-2 rounded-xl p-5">
              {item.hearingDate && (
                <p className="font-semibold text-darkbg text-lg">
                  Hearing Date: <span className="font-normal">{item.hearingDate}</span>
                </p>
              )}
              {item.courtName && (
                <p className="font-semibold text-darkbg text-lg">
                  Court name: <span className="font-normal">{item.courtName}</span>
                </p>
              )}
              {item.judgeName && (
                <p className="font-semibold text-darkbg text-lg">
                  Judge Name: <span className="font-normal">{item.judgeName}</span>
                </p>
              )}
              {item.agenda && (
                <p className="font-semibold text-darkbg text-lg">
                  Agenda: <span className="font-normal">{item.agenda}</span>
                </p>
              )}
              {item.outcome && (
                <p className="font-semibold text-darkbg text-lg">
                  Outcome: <span className="font-normal">{item.outcome}</span>
                </p>
              )}
              {item.rescheduleDetails?.rescheduledDate && (
                <p className="font-semibold text-darkbg text-lg">
                  Rescheduled Date: <span className="font-normal">{item.rescheduleDetails.rescheduledDate}</span>
                </p>
              )}
              {item.rescheduleDetails?.reason && (
                <p className="font-semibold text-darkbg text-lg">
                  Reschedule Reason: <span className="font-normal">{item.rescheduleDetails.reason}</span>
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-darkbg">No hearing management details available.</p>
        )}
      </div>
      <div className="h-[150px]"></div>

      <button
        onClick={() => {
          handleGetAdvice();
        }}
        className="fixed bottom-1 left-0 right-0 w-[90%] mx-auto bg-darkbg p-5 rounded-xl"
      >
        {advice ? (
          <div>
            <Markdown className="text-white text-lg font-semibold">{advice}</Markdown>
          </div>
        ) : responseLoading ? (
          <div className="flex justify-center">
            <span className="text-white">Loading...</span>
          </div>
        ) : (
          <span className="text-lg font-bold text-center text-bg">
            Get Future hearing Assistance!
          </span>
        )}
      </button>
    </div>
  );
};

export default Hearing;
