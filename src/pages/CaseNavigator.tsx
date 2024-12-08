import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const CaseNavigator = () => {
  const navigate = useNavigate();
  const [currentCase, getLegalResearch, responseLoading] = useStore(
    useShallow((state) => [state.currentCase, state.getLegalResearch, state.responseLoading])
  );

  const [filingExpanded, setFilingExpanded] = useState(false);
  const [evidenceExpanded, setEvidenceExpanded] = useState<boolean>(false)
  const [researchExpanded, setResearchExpanded] = useState<boolean>(false)
  const [researchGenerated, setResearchGenerated] = useState<boolean>(false)
  const [hearingExpanded, setHearingExpanded] = useState<boolean>(false)

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
  const [evidenceType, setEvidenceType] = useState<string>("")
  const [evidenceTitle, setEvidenceTitle] = useState<string>("")
  const [evidenceDescription, setEvidenceDescription] = useState<string>("")
  const [evidenceUploadDate, setEvidenceUploadDate] = useState<string>("")
  const [researchTopic, setResearchTopic] = useState<string>("")
  const [researchNotes, setResearchNotes] = useState<string>("")
  const [preCaseTitle, setPreCaseTitle] = useState<string>("")
  const [preCaseSummary, setPreCaseSummary] = useState<string>("")
  const [preRulingDate, setPreRulingDate] = useState<string>("")
  const [preCourt, setPreCourt] = useState<string>("")
  const [hearingDate, setHearingDate] = useState<string>("")
  const [hearingCourt, setHearingCourt] = useState<string>("")
  const [hearingJudge, setHearingJudge] = useState<string>("")
  const [hearingAgenda, setHearingAgenda] = useState<string>("")
  const [hearingOutcome, setHearingOutcome] = useState<string>("")
  const [hearingReDate, setHearingReDate] = useState<string>("")
  const [hearingReReason, setHearingReReason] = useState<string>("")

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

  const evidenceTypeList = ["Physical", "Digital", "Witness Statement", "Other"]

  useEffect(() => {
    if (filingExpanded) {
      handleAutofill();
    }
  }, [filingExpanded]);

  const handleUpdateCaseFiling = async () => {
    const updatedCaseFiling: CaseFiling = {
      caseTitle: title.trim(),
      clientDetails: {
        name: userName.trim(),
        contact: contact.trim(),
        email: email.trim(),
        address: address.trim() || undefined,
      },
      caseType: caseCategory as CaseFiling['caseType'],
      filingDate: filingDate.trim(),
      jurisdiction: jurisdiction.trim(),
      documentsRequired: currentCase?.caseFiling?.documentsRequired || [],
      status: caseStatus as CaseFiling['status'],
    };

    const caseIndex = useStore.getState().caseList.findIndex(
      (p) => p.caseFiling.caseTitle === currentCase?.caseFiling?.caseTitle
    );
    if (caseIndex !== -1) {
      useStore.setState((state) => {
        const updatedCaseList = [...state.caseList];
        updatedCaseList[caseIndex] = {
          ...updatedCaseList[caseIndex],
          caseFiling: updatedCaseFiling,
        };
        return {
          ...state,
          currentCase: {
            ...state.currentCase,
            navigateStatus: state.currentCase?.navigateStatus ?? 0,
            caseFiling: updatedCaseFiling,
            evidenceCollection: state.currentCase?.evidenceCollection ?? null,
            legalResearch: state.currentCase?.legalResearch ?? null,
            hearingManagement: state.currentCase?.hearingManagement ?? null,
            caseResolution: state.currentCase?.caseResolution ?? null,
          },
          caseList: updatedCaseList,
        };
      });
    }
    setFilingExpanded(false)
  }

  const handleAddEvidence = async () => {
    const newEvidence: EvidenceCollection = {
      evidenceType: evidenceType as EvidenceCollection['evidenceType'],
      title: evidenceTitle.trim(),
      description: evidenceDescription.trim(),
      uploadDate: evidenceUploadDate.trim(),
    };

    const caseIndex = useStore.getState().caseList.findIndex(
      (p) => p.caseFiling.caseTitle === useStore.getState().currentCase?.caseFiling?.caseTitle
    );

    if (caseIndex !== -1) {
      useStore.setState((state) => {
        const updatedEvidenceCollection = [
          ...(state.currentCase?.evidenceCollection || []),
          newEvidence,
        ];

        const updatedCaseList = [...state.caseList];
        updatedCaseList[caseIndex] = {
          ...updatedCaseList[caseIndex],
          evidenceCollection: updatedEvidenceCollection,
        };

        return {
          ...state,
          currentCase: {
            ...state.currentCase,
            navigateStatus: state.currentCase?.navigateStatus ?? 0,
            evidenceCollection: updatedEvidenceCollection,
            caseFiling: state.currentCase?.caseFiling!!,
            legalResearch: state.currentCase?.legalResearch ?? null,
            hearingManagement: state.currentCase?.hearingManagement ?? null,
            caseResolution: state.currentCase?.caseResolution ?? null,
          },
          caseList: updatedCaseList,
        };
      });
      alert('Evidence added successfully!');
    } else {
      alert('Error: Case not found');
    }
    setEvidenceTitle("")
    setEvidenceDescription("")
    setEvidenceUploadDate("")
    setEvidenceType("")
  };

  const handleAddResearch = async () => {

    const precedentCases: PrecedentCases = {
      caseTitle: preCaseTitle.trim(),
      caseSummary: preCaseSummary.trim(),
      rulingDate: preRulingDate.trim(),
      court: preCourt.trim(),
    }

    const researchFinding: LegalResearch = {
      topic: researchTopic.trim(),
      notes: researchNotes.trim(),
      precedentCases: precedentCases,
    };

    const caseIndex = useStore.getState().caseList.findIndex(
      (p) => p.caseFiling.caseTitle === useStore.getState().currentCase?.caseFiling?.caseTitle
    );

    if (caseIndex !== -1) {
      useStore.setState((state) => {
        const updatedLegalResearch = [
          ...(state.currentCase?.legalResearch || []),
          researchFinding,
        ];

        const updatedCaseList = [...state.caseList];
        updatedCaseList[caseIndex] = {
          ...updatedCaseList[caseIndex],
          legalResearch: updatedLegalResearch,
        };

        return {
          ...state,
          currentCase: {
            ...state.currentCase,
            navigateStatus: state.currentCase?.navigateStatus ?? 0,
            legalResearch: updatedLegalResearch,
            caseFiling: state.currentCase?.caseFiling!!,
            evidenceCollection: state.currentCase?.evidenceCollection ?? null,
            hearingManagement: state.currentCase?.hearingManagement ?? null,
            caseResolution: state.currentCase?.caseResolution ?? null,
          },
          caseList: updatedCaseList,
        };
      });
      alert('Research added successfully!');
      setResearchTopic('');
      setResearchNotes('');
      setPreCaseTitle('');
      setPreCaseSummary('');
      setPreRulingDate('');
      setPreCourt('');
    } else {
      alert('Error: Case not found!');
    }
  };

  const handleResearchFindings = async () => {
    if (researchGenerated) {
      navigate("/Research")
    } else {
      currentCase ? await getLegalResearch(currentCase) : null
      setResearchGenerated(true)
    }
  }

  const handleAddHearing = async () => {
    const hearing: HearingManagement = {
      hearingDate: hearingDate,
      courtName: hearingCourt,
      judgeName: hearingJudge,
      agenda: hearingAgenda,
      outcome: hearingOutcome,
      rescheduleDetails: {
        rescheduledDate: hearingReDate,
        reason: hearingReReason,
      },
    };

    const caseIndex = useStore.getState().caseList.findIndex(
      (p) => p.caseFiling.caseTitle === useStore.getState().currentCase?.caseFiling?.caseTitle
    );

    if (caseIndex !== -1) {
      useStore.setState((state) => {
        const updatedHearingManagement = [
          ...(state.currentCase?.hearingManagement || []),
          hearing,
        ];

        const updatedCaseList = [...state.caseList];
        updatedCaseList[caseIndex] = {
          ...updatedCaseList[caseIndex],
          hearingManagement: updatedHearingManagement,
        };

        return {
          ...state,
          currentCase: {
            ...state.currentCase,
            navigateStatus: state.currentCase?.navigateStatus ?? 0,
            hearingManagement: updatedHearingManagement,
            caseFiling: state.currentCase?.caseFiling!!,
            legalResearch: state.currentCase?.legalResearch ?? null,
            evidenceCollection: state.currentCase?.evidenceCollection ?? null,
            caseResolution: state.currentCase?.caseResolution ?? null,
          },
          caseList: updatedCaseList,
        };
      });
      alert('Hearing added successfully!');

      setHearingDate('');
      setHearingCourt('');
      setHearingJudge('');
      setHearingAgenda('');
      setHearingOutcome('');
      setHearingReDate('');
      setHearingReReason('');
    } else {
      alert('Error: Case not found!');
    }
  };

  const handleProceedToNewSection = async () => {
    let status = navigateStatus;
    if (status === 1) {
      if (!currentCase?.evidenceCollection || currentCase.evidenceCollection.length === 0) {
        alert("No Evidence, Cannot proceed further without Evidences!");
        return;
      }
    } else if (status === 2) {
      if (!currentCase?.legalResearch || currentCase.legalResearch.length === 0) {
        alert("No Research found, Cannot proceed further without Legal Research!");
        return;
      }
    } else if (status === 3) {
      if (!currentCase?.hearingManagement || currentCase.hearingManagement.length === 0) {
        alert("No Hearings found, Cannot proceed further without Legal Hearings!");
        return;
      }
    } else if (status === 4) {
      return;
    }
    status++;
    useStore.setState((state) => {
      const caseIndex = state.caseList.findIndex(
        (p) => p.caseFiling.caseTitle === state.currentCase?.caseFiling?.caseTitle
      );
      if (caseIndex !== -1) {
        const updatedCaseList = [...state.caseList];
        updatedCaseList[caseIndex] = {
          ...updatedCaseList[caseIndex],
          navigateStatus: status,
        };

        return {
          ...state,
          currentCase: {
            ...state.currentCase!!,
            navigateStatus: status,
          },
          caseList: updatedCaseList,
        };
      }
      return state;
    });
    setNavigateStatus(status);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh", }}>
      <h1 className="text-3xl font-bold text-primary">Case Navigator!</h1>
      <p className="text-xl font-semibold text-black">Your personalized case manager!</p>

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
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        {currentCase && (
          <div>
            <div className="mt-2 bg-secondary  p-5 rounded-xl">
              <button
                onClick={() => setFilingExpanded(!filingExpanded)}
                className="flex items-center justify-between w-full"
              >
                <span className="text-xl text-darkbg font-semibold">Case Filing</span>
                {filingExpanded ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </button>
              {filingExpanded && (
                <div className="max-w-[200]">
                  <label className="text-darkbg text-lg font-bold mt-5 block">
                    Case Title
                  </label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter case title"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <div className="h-[3px] bg-tertiary mt-5"></div>

                  <label className="text-darkbg text-lg font-bold mt-4 block">
                    Client Details
                  </label>
                  <label className="text-darkbg text-lg mt-2 block font-semibold ">Name</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <label className="text-darkbg text-lg mt-2 block font-semibold ">Contact</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter your contact number"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <label className="text-darkbg text-lg mt-2 block font-semibold ">Email</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <label className="text-darkbg text-lg mt-2 block font-semibold ">Address</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <div className="h-[3px] bg-tertiary mt-5"></div>

                  <label className="text-darkbg text-lg font-bold mt-4 block">
                    Case Type
                  </label>
                  <div className="flex overflow-x-auto space-x-2 mt-2">
                    {categoryList.map((item) => (
                      <button
                        key={item}
                        onClick={() => setCaseCategory(item)}
                        className={`p-3 rounded-xl ${caseCategory === item ? "bg-tertiary" : "bg-background"
                          }`}
                      >
                        <span
                          className={`font-semibold ${caseCategory === item ? "text-white" : "text-darkbg"
                            }`}
                        >
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="h-[3px] bg-tertiary mt-5"></div>

                  <label className="text-darkbg text-lg mt-4 block font-semibold ">Filing Date</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={filingDate}
                      onChange={(e) => setFilingDate(e.target.value)}
                      placeholder="Enter the filing date"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <label className="text-darkbg text-lg mt-2 block font-semibold ">
                    Jurisdiction
                  </label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      placeholder="Enter jurisdiction"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>
                  <div className="h-[3px] bg-tertiary mt-5"></div>

                  <label className="text-darkbg text-lg font-bold mt-4 block">
                    Case Status
                  </label>
                  <div className="flex overflow-x-auto space-x-2 mt-2">
                    {caseStatusList.map((item) => (
                      <button
                        key={item}
                        onClick={() => setCaseStatus(item)}
                        className={`p-3 rounded-xl ${caseStatus === item ? "bg-tertiary" : "bg-background"
                          }`}
                      >
                        <span
                          className={`font-semibold ${caseStatus === item ? "text-white" : "text-darkbg"
                            }`}
                        >
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleUpdateCaseFiling}
                    className="p-5 bg-primary text-white text-lg font-bold rounded-xl mt-5 w-full"
                  >
                    Update Case Filing Details
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {navigateStatus > 0 ?
          <>
            <div className="p-5 rounded-xl bg-secondary mt-2">
              <button
                onClick={() => setEvidenceExpanded(!evidenceExpanded)}
                className="flex flex-row items-center justify-between w-full"
              >
                <span className="text-xl text-darkbg font-semibold">
                  Evidence Collection
                </span>
                {evidenceExpanded ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </button>
              {evidenceExpanded && (
                <div>
                  <label className="text-darkbg text-lg font-bold mt-2 block">
                    Evidence Title
                  </label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={evidenceTitle}
                      onChange={(e) => setEvidenceTitle(e.target.value)}
                      placeholder="Enter Evidence Title"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2 block">
                    Evidence Description
                  </label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <textarea
                      value={evidenceDescription}
                      onChange={(e) => setEvidenceDescription(e.target.value)}
                      placeholder="Enter Evidence Description"
                      rows={3}
                      className="w-full outline-none bg-secondary placeholder-black"
                    ></textarea>
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2 block">
                    Evidence Date
                  </label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={evidenceUploadDate}
                      onChange={(e) => setEvidenceUploadDate(e.target.value)}
                      placeholder="Enter Evidence Date"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2 block">
                    Evidence Type
                  </label>
                  <div className="flex overflow-x-auto space-x-2 mt-2">
                    {evidenceTypeList.map((item) => (
                      <button
                        key={item}
                        onClick={() => setEvidenceType(item)}
                        className={`p-3 rounded-xl m-1 ${evidenceType === item ? "bg-tertiary" : "bg-background"
                          }`}
                      >
                        <span
                          className={`font-semibold text-base ${evidenceType === item ? "text-white" : "text-darkbg"
                            }`}
                        >
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>

                  {currentCase?.evidenceCollection?.length !== 0 && (
                    <Link
                      to={"/Evidence"}
                      className="text-tertiary text-lg font-bold mt-5 block"
                    >
                      View All Evidences
                    </Link>
                  )}

                  <button
                    onClick={handleAddEvidence}
                    className="p-5 flex items-center justify-center bg-primary rounded-xl mt-5 w-full"
                  >
                    <span className="text-white text-lg font-bold">Add new evidence</span>
                  </button>
                </div>
              )}
            </div>
          </> : null}
        {navigateStatus > 1 ?
          <>
            <div className="bg-secondary p-5 rounded-xl mt-2">
              <div
                onClick={() => setResearchExpanded(!researchExpanded)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="text-xl  font-semibold">Legal Research</span>
                {researchExpanded ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </div>

              {researchExpanded && (
                <div>
                  <div className="mt-5">
                    <span className="text-lg font-semibold text-background text-center">
                    </span>
                    <button
                      onClick={()=>{
                        if(!researchGenerated){
                          handleResearchFindings()
                        }else{
                          navigate("/Research")
                        }
                      }}
                      className="p-5 rounded-xl bg-primary w-full mt-4 text-white"
                    >
                      {responseLoading ?
                        <span>Loading...</span> :
                        researchGenerated ? 
                          'Go to Research Findings!'
                        : 'Start Research'
                      }
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div className="h-[3px] bg-tertiary w-[45%]"></div>
                    <span className="font-bold text-lg">or</span>
                    <div className="h-[3px] bg-tertiary w-[45%]"></div>
                  </div>

                  <span className="text-darkbg text-lg font-bold mt-2">Enter Research Findings</span>
                  <div className="mt-2">
                    <span className="text-darkbg text-lg font-bold">Topic</span>
                    <div className="border-2 rounded-2xl p-3 border-darkbg">
                      <input
                        type="text"
                        value={researchTopic}
                        onChange={(e) => setResearchTopic(e.target.value)}
                        placeholder="Enter Research Topic"
                        className="w-full outline-none bg-secondary placeholder-black"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="text-darkbg text-lg font-bold">Notes</span>
                    <div className="border-2 rounded-2xl p-3 border-darkbg">
                      <input
                        type="text"
                        value={researchNotes}
                        onChange={(e) => setResearchNotes(e.target.value)}
                        placeholder="Enter Research Notes"
                        className="w-full outline-none bg-secondary placeholder-black"
                      />
                    </div>
                  </div>

                  <div className="h-[3px] bg-tertiary my-5"></div>

                  <div>
                    <span className="text-darkbg text-lg font-bold mt-4">Precedent Cases</span>
                    <div className="mt-2">
                      <span className="text-darkbg font-semibold text-lg">Case Title</span>
                      <div className="border-2 rounded-2xl p-3 border-darkbg">
                        <input
                          type="text"
                          value={preCaseTitle}
                          onChange={(e) => setPreCaseTitle(e.target.value)}
                          placeholder="Case Title"
                          className="w-full outline-none bg-secondary placeholder-black"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-darkbg font-semibold  text-lg">Case Summary</span>
                      <div className="border-2 rounded-2xl p-3 border-darkbg">
                        <input
                          type="text"
                          value={preCaseSummary}
                          onChange={(e) => setPreCaseSummary(e.target.value)}
                          placeholder="Case Summary"
                          className="w-full outline-none bg-secondary placeholder-black"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-darkbg text-lg font-semibold">Ruling Date</span>
                      <div className="border-2 rounded-2xl p-3 border-darkbg">
                        <input
                          type="text"
                          value={preRulingDate}
                          onChange={(e) => setPreRulingDate(e.target.value)}
                          placeholder="Enter Ruling date"
                          className="w-full outline-none bg-secondary placeholder-black"
                        />
                      </div>
                    </div>

                    <div className="mt-2 mb-5">
                      <span className="text-darkbg text-lg font-semibold ">Court</span>
                      <div className="border-2 rounded-2xl p-3 border-darkbg">
                        <input
                          type="text"
                          value={preCourt}
                          onChange={(e) => setPreCourt(e.target.value)}
                          placeholder="Enter Court"
                          className="w-full outline-none bg-secondary placeholder-black"
                        />
                      </div>
                    </div>

                    {currentCase?.legalResearch?.length !== 0 && (
                      <span
                        onClick={() => navigate('/Research')}
                        className="text-tertiary text-lg font-bold mt-5 cursor-pointer"
                      >
                        View Research Findings
                      </span>
                    )}

                    <button
                      onClick={handleAddResearch}
                      className="p-5 rounded-xl bg-primary mt-5 w-full"
                    >
                      <span className="text-lg font-semibold text-bg text-center">
                        Add Research Findings
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
          : null}
          {navigateStatus>2?
            <>
            <div className="p-5 rounded-xl bg-secondary mt-2">
              <div className="flex flex-row items-center justify-between">
                <button
                  onClick={() => setHearingExpanded(!hearingExpanded)}
                  className="flex-row flex w-full items-center justify-between"
                >
                  <h2 className="text-xl text-darkbg font-semibold">Hearing Management</h2>
                  {hearingExpanded ? (
                    <FaChevronUp size={23} />
                  ) : (
                    <FaChevronDown size={23} />
                  )}
                </button>
              </div>

              {hearingExpanded && (
                <div className="flex gap-1 flex-col">
                  <h3 className="text-darkbg text-lg font-bold mt-5">Add Hearing Details!</h3>

                  <label className="text-darkbg text-lg font-bold mt-2">Hearing Date</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingDate}
                      onChange={(e) => setHearingDate(e.target.value)}
                      placeholder="Enter hearing date"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2">Court</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingCourt}
                      onChange={(e) => setHearingCourt(e.target.value)}
                      placeholder="Enter court name"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2">Judge</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingJudge}
                      onChange={(e) => setHearingJudge(e.target.value)}
                      placeholder="Enter judge name"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2">Agenda</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingAgenda}
                      onChange={(e) => setHearingAgenda(e.target.value)}
                      placeholder="Enter agenda"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2">Outcome</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingOutcome}
                      onChange={(e) => setHearingOutcome(e.target.value)}
                      placeholder="Enter outcome"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <div className="h-[3px] bg-tertiary mt-5" />

                  <h3 className="text-darkbg text-lg font-bold mt-4">Rescheduling Details</h3>

                  <label className="text-darkbg text-lg font-bold">Date</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingReDate}
                      onChange={(e) => setHearingReDate(e.target.value)}
                      placeholder="Enter rescheduling date"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  <label className="text-darkbg text-lg font-bold mt-2">Reason</label>
                  <div className="border-2 rounded-2xl p-3 border-darkbg">
                    <input
                      type="text"
                      value={hearingReReason}
                      onChange={(e) => setHearingReReason(e.target.value)}
                      placeholder="Enter rescheduling reason"
                      className="w-full outline-none bg-secondary placeholder-black"
                    />
                  </div>

                  {currentCase?.hearingManagement?.length !== 0 && (
                    <p
                      onClick={() => {
                        navigate('/Hearing');
                      }}
                      className="text-tertiary text-lg font-bold mt-5"
                    >
                      View hearing record
                    </p>
                  )}

                  <button
                    onClick={handleAddHearing}
                    className="w-full p-5 rounded-xl outline-none bg-primary placeholder-black"
                  >
                    <span className="text-lg font-semibold text-bg">
                      Add Hearing Details
                    </span>
                  </button>
                </div>
              )}
            </div>
            </>
          :null}
      </div>

      <button
        onClick={handleProceedToNewSection}
        className="bg-tertiary"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
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
