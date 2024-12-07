import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";

const CaseNavigator = () => {
  const navigate = useNavigate();
  const [currentCase, updateCaseState] = useStore(
    useShallow((state) => [state.currentCase, state.updateCaseState])
  );

  const [filingExpanded, setFilingExpanded] = useState(false);
  const [navigateStatus, setNavigateStatus] = useState<number>(
    currentCase?.navigateStatus || 0
  );

  const [title, setTitle] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [caseCategory, setCaseCategory] = useState<string>("");
  const [filingDate, setFilingDate] = useState<string>("");
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const [caseStatus, setCaseStatus] = useState<string>("Draft");

  const categoryList = ["Civil", "Criminal", "Corporate", "Family", "Other"];
  const caseStatusList = ["Draft", "Submitted", "Rejected"];

  const handleAutofill = () => {
    if (currentCase && currentCase.caseFiling) {
      const { caseTitle, clientDetails, caseType, filingDate, jurisdiction, status } =
        currentCase.caseFiling;

      setTitle(caseTitle || "");
      setUserName(clientDetails?.name || "");
      setContact(clientDetails?.contact || "");
      setEmail(clientDetails?.email || "");
      setAddress(clientDetails?.address || "");
      setCaseCategory(caseType || "");
      setFilingDate(filingDate || "");
      setJurisdiction(jurisdiction || "");
      setCaseStatus(status || "Draft");
    } else {
      alert("No case data available for autofill.");
    }
  };

  useEffect(() => {
    if (filingExpanded) {
      handleAutofill();
    }
  }, [filingExpanded]);

  const handleSaveAndUpdateState = () => {
    const updatedCase = {
      ...currentCase,
      caseFiling: {
        caseTitle: title,
        clientDetails: {
          name: userName,
          contact: contact,
          email: email,
          address: address,
        },
        caseType: caseCategory,
        filingDate: filingDate,
        jurisdiction: jurisdiction,
        status: caseStatus,
      },
      navigateStatus,
    };
    updateCaseState(updatedCase);
    alert("Case details updated successfully!");
  };

  const handleNextSection = () => {
    setNavigateStatus((prev) => prev + 1);
    navigate("/Evidence"); 
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1>Case Navigator!</h1>
      <p>Your personalized case manager!</p>

      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h2>Case Title: {title || "Untitled Case"}</h2>
      </div>

      <div
        style={{
          backgroundColor: "#ddd",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setFilingExpanded(!filingExpanded)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Case Filing {filingExpanded ? "-" : "+"}
        </button>

        {filingExpanded && (
          <div style={{ marginTop: "20px" }}>
            <label>Case Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter case title"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <label>Client Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter client name"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <label>Case Type</label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {categoryList.map((item) => (
                <button
                  key={item}
                  onClick={() => setCaseCategory(item)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: caseCategory === item ? "#007bff" : "#f0f0f0",
                    color: caseCategory === item ? "#fff" : "#333",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={handleSaveAndUpdateState}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Save & Update
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleNextSection}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#17a2b8",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Next Section
      </button>
    </div>
  );
};

export default CaseNavigator;
