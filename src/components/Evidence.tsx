import React from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";

const Evidence = () => {
  const navigate = useNavigate();
  const [currentCase] = useStore(useShallow((state) => [state.currentCase]));

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-3 bg-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-darkbg">Evidence List</h1>
          <p className="text-base text-darkbg">
            View and manage your evidences
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {currentCase?.evidenceCollection?.map((item: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; uploadDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; evidenceType: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <div
            key={index}
            className="bg-secondary rounded-xl p-5 shadow-md"
          >
            {item.title && (
              <p className="text-lg font-semibold text-darkbg">
                Title: <span className="font-normal">{item.title}</span>
              </p>
            )}
            {item.description && (
              <p className="text-darkbg font-semibold">
                Description:{" "}
                <span className="font-normal">{item.description}</span>
              </p>
            )}
            {item.uploadDate && (
              <p className="text-darkbg font-semibold">
                Upload Date:{" "}
                <span className="font-normal">{item.uploadDate}</span>
              </p>
            )}
            {item.evidenceType && (
              <p className="text-darkbg font-semibold">
                Type: <span className="font-normal">{item.evidenceType}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evidence;
