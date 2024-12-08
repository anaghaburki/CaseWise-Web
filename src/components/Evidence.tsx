import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";

const Evidence = () => {
  const [currentCase] = useStore(useShallow((state) => [state.currentCase]));

  return (
    <div className="min-h-screen bg-bg px-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 my-4">
          <Link
            to={"/CaseNavigator"}
            className="rounded-full p-3 bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl text-darkbg font-bold">Evidence List</h1>
            <p className="text-base text-darkbg">View and manage your evidences</p>
          </div>
        </div>
        <div className="space-y-4">
          {currentCase?.evidenceCollection?.map((item, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-5 space-y-2"
            >
              {item?.title && (
                <p className="font-semibold text-darkbg text-lg">
                  Title: <span className="font-normal">{item.title}</span>
                </p>
              )}
              {item?.description && (
                <p className="text-darkbg font-semibold">
                  Description: <span className="font-normal">{item.description}</span>
                </p>
              )}
              {item?.uploadDate && (
                <p className="text-darkbg font-semibold">
                  Upload Date: <span className="font-normal">{item.uploadDate}</span>
                </p>
              )}
              {item?.evidenceType && (
                <p className="text-darkbg font-semibold">
                  Type: <span className="font-normal">{item.evidenceType}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evidence;
