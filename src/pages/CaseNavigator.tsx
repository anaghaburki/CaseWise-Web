import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";

const CaseNavigator = () => {

  const [currentCase] = useStore(
    useShallow((state) => [state.currentCase])
  )

  const [filingExpanded, setFilingExpanded] = useState(false);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);

  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [caseCategory, setCaseCategory] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [caseStatus, setCaseStatus] = useState("Draft");
  const [evidenceType, setEvidenceType] = useState("");
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [evidenceDescription, setEvidenceDescription] = useState("");
  const [evidenceUploadDate, setEvidenceUploadDate] = useState("");

  const categoryList = ["Civil", "Criminal", "Corporate", "Family", "Other"];
  const caseStatusList = ["Draft", "Submitted", "Rejected"];
  const evidenceTypeList = ["Physical", "Digital", "Witness Statement", "Other"];

  const handleAutofill = () => {
    if (currentCase && currentCase.caseFiling) {
      const { caseTitle, clientDetails, caseType, filingDate, jurisdiction, status } = currentCase.caseFiling;

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

  const handleUpdateCaseFiling = () => {
    alert("Case Filing updated successfully!");
    setFilingExpanded(false);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1>Case Navigator!</h1>
      <p>Your personalized case manager!</p>

      <div style={{ backgroundColor: "#333", color: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h2>Case Title: {title || "Untitled Case"}</h2>
      </div>

      <div style={{ backgroundColor: "#ddd", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <button
          onClick={() => setFilingExpanded(!filingExpanded)}
          style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px", border: "none", borderRadius: "5px" }}
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
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Client Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter client name"
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
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

            <label>Filing Date</label>
            <input
              type="date"
              value={filingDate}
              onChange={(e) => setFilingDate(e.target.value)}
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Jurisdiction</label>
            <input
              type="text"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              placeholder="Enter jurisdiction"
              style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <label>Case Status</label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {caseStatusList.map((item) => (
                <button
                  key={item}
                  onClick={() => setCaseStatus(item)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: caseStatus === item ? "#007bff" : "#f0f0f0",
                    color: caseStatus === item ? "#fff" : "#333",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={handleUpdateCaseFiling}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Update Case Filing Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseNavigator;
