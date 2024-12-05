import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const CaseList = () => {
  const caseList = useStore((state) => state.caseList);
  const setCurrentCase = useStore((state) => state.currentCase); // Assuming you have an action to set `currentCase`
  const navigate = useNavigate();

  return (
    <div>
      {caseList.map((item) => (
        <div
          key={item.id} // Add a unique key for each item
          className="p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setCurrentCase(item); // Set the clicked case as the current case
            navigate("/case-navigator"); // Navigate to the case navigator page
          }}
        >
          <h3 className="text-lg font-semibold">{item.caseFiling.caseTitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
