import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useShallow } from 'zustand/shallow';
import { Player } from '@lottiefiles/react-lottie-player';
import analysisAnim from '../assets/raw/documentanalysis.json'
import partiesInvolvedAnim from '../assets/raw/partiesinvolved.json'
import obligationsAnim from '../assets/raw/obligations.json'
import actionItemsAnim from '../assets/raw/actionitems.json'
import terminationAnim from '../assets/raw/termination.json'
import generalrisk from '../assets/raw/generalrisk.json'
import legalrisk from '../assets/raw/legalrisk.json'
import financialrisk from '../assets/raw/financialrisk.json'
import reputationalrisk from '../assets/raw/reputationalrisk.json'
import reviewAnim from '../assets/raw/review.json'
import protectionAnim from '../assets/raw/protection.json'
import overallAnim from '../assets/raw/analysis.json'
import documentAnim from '../assets/raw/document.json'
import docProcessingAnim from '../assets/raw/docprocessing.json'
import termsAnim from '../assets/raw/terms.json'

import Modal from '../components/Modal';

const ContractSummarizer: React.FC = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [termsExpanded, setTermsExpanded] = useState<boolean>(false)
  const [obligationsExpanded, setObligationsExpanded] = useState<boolean>(false)
  const [actionItemsExpanded, setActionItemsExpanded] = useState<boolean>(false)
  const [terminationExpanded, setTerminationExpanded] = useState<boolean>(false)
  const [generalRiskExpanded, setGeneralRiskExpanded] = useState<boolean>(false)
  const [legalRiskExpanded, setLegalRiskExpanded] = useState<boolean>(false)
  const [financialRiskExpanded, setFinancialRiskExpanded] = useState<boolean>(false)
  const [reputationalRiskExpanded, setReputationalRiskExpanded] = useState<boolean>(false)
  const [reviewExpanded, setReviewExpanded] = useState<boolean>(false)
  const [protectionExpanded, setProtectionExpanded] = useState<boolean>(false)
  const [overallExpanded, setOverallExpanded] = useState<boolean>(false)

  const [responseLoading, getDocumentAnalysis, documentAnalysis] = useStore(
    useShallow((state) => [state.responseLoading, state.getDocumentAnalysis, state.documentAnalysis])
  );

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      await getDocumentAnalysis(file);
    }
  };

  const width = window.innerHeight

  return (
    responseLoading ? (
      <div className="flex h-screen flex-1 flex-col items-center justify-center pt-20 bg-bg">
        <Player
          autoplay
          loop
          src={docProcessingAnim}
          style={{ width: width * 0.5 }}
        />
        <h1 className="text-darkbg text-lg font-bold">
          We are analyzing your document!
        </h1>
      </div>
    ) :
      documentAnalysis ? (
        <div>
          <div className='flex flex-1 items-center justify-evenly bg-bg flex-col gap-3 h-screen max-h-screen pt-20 pb-10'>
            {documentAnalysis.document_name || documentAnalysis.document_type ?
              <div className='p-5 rounded-xl bg-darkbg justify-center items-center self-center flex flex-row gap-5 h-[330px]'>
                <div>
                  <Player
                    autoplay
                    loop
                    src={analysisAnim}
                    style={{ width: width * 0.3 }}
                  />
                  {documentAnalysis.document_name ? <h1 className='text-bg font-bold text-xl text-center mt-3'>{documentAnalysis.document_name}</h1> : null}
                  {documentAnalysis.document_type ? <h1 className='text-bg text-center'>{documentAnalysis.document_name}</h1> : null}
                </div>
                <div className="border-l-2 border-bg h-[280px]"></div>
                <div className='flex flex-col gap-5 mr-3'>
                  <h1 className='text-bg font-bold text-lg'>
                    Effective Date: <h1 className='font-normal text-base'>{documentAnalysis.effective_date ? documentAnalysis.effective_date : "Not Specified"}</h1>
                  </h1>
                  <h1 className='text-bg font-bold text-lg'>
                    Termination Date: <h1 className='font-normal text-base'>{documentAnalysis.termination_date ? documentAnalysis.termination_date : "Not Specified"}</h1>
                  </h1>
                </div>
                {documentAnalysis.parties_involved ?
                  <div className='rounded-lg p-5 bg-secondary flex flex-col flex-1 h-[310px] -m-3 gap-5 justify-center overflow-y-scroll no-scrollbar'>
                    <div className='flex flex-row items-center justify-between'>
                      <h1 className='text-primary font-bold text-xl text-center mt-3'>Parties Involved</h1>
                      <Player
                        autoplay
                        loop
                        src={partiesInvolvedAnim}
                        style={{ width: width * 0.09 }}
                      />
                    </div>
                    <div className='rounded-xl bg-bg p-5'>
                      {documentAnalysis.parties_involved?.map((item, index) =>
                        <h1 className='text-primary my-1 font-semibold'>{index + 1}: {item}</h1>
                      )}
                    </div>
                  </div>
                  : null}
              </div>
              : null}
            <div className='flex flex-wrap w-5/6 gap-2 justify-center'>
              {documentAnalysis.key_terms ? (
                <div className='flex flex-col rounded-xl bg-tertiary p-5 w-1/5 items-center justify-between' onClick={() => { setTermsExpanded(true) }}>
                  <Player
                    autoplay
                    loop
                    src={termsAnim}
                    style={{ width: width * 0.2 }}
                  />
                  <h1 className='text-bg text-lg font-bold'>
                    Key Terms
                  </h1>
                  {documentAnalysis.key_terms.terms?.length !== 0 ?
                    <Modal isOpen={termsExpanded} onClose={() => { setTermsExpanded(false) }} title='Key Terms'>
                      {documentAnalysis.key_terms.description ?
                        <h1 className='text-darkbg text-base p-5'>
                          {documentAnalysis.key_terms.description}
                        </h1>
                        : null}
                      {documentAnalysis.key_terms.terms?.map((item) =>
                        <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                          {item.term ? <h1 className='text-primary font-bold inline'>Term:<span className='font-normal inline'> {item.term}</span></h1> : null}
                          {item.importance ? <h1 className='text-primary font-bold'>Importance: <span className='font-normal'>{item.importance}</span></h1> : null}
                        </div>
                      )}
                    </Modal>
                    : null}
                </div>
              ) : null}
              {(documentAnalysis.obligations?.length !== 0) ? (
                <div className='flex flex-col justify-between items-center rounded-xl bg-tertiary p-5 w-1/5' onClick={() => { setObligationsExpanded(true) }}>
                  <Player
                    autoplay
                    loop
                    src={obligationsAnim}
                    style={{ width: width * 0.3 }}
                  />
                  <h1 className='text-bg text-lg font-bold'>
                    Obligations
                  </h1>
                  <Modal isOpen={obligationsExpanded} onClose={() => { setObligationsExpanded(false) }} title='Obligations'>
                    {documentAnalysis.obligations?.map((item) =>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        {item.obligation ? <h1 className='text-primary font-bold inline'>Obligation:<span className='font-normal inline'> {item.obligation}</span></h1> : null}
                        {item.description ? <h1 className='text-primary font-bold'>Description: <span className='font-normal'>{item.description}</span></h1> : null}
                        {item.due_date ? <h1 className='text-primary font-bold'>Due Date: <span className='font-normal'>{item.due_date}</span></h1> : null}
                      </div>
                    )}
                  </Modal>
                </div>
              ) : null}
              {(documentAnalysis.action_items?.length !== 0) ? (
                <div className='flex flex-col justify-between items-center rounded-xl bg-tertiary p-5 w-1/5' onClick={() => { setActionItemsExpanded(true) }}>
                  <Player
                    autoplay
                    loop
                    src={actionItemsAnim}
                    style={{ width: width * 0.2 }}
                  />
                  <h1 className='text-bg text-lg font-bold'>
                    Action Items
                  </h1>
                  <Modal isOpen={actionItemsExpanded} onClose={() => { setActionItemsExpanded(false) }} title='Action Items'>
                    {documentAnalysis.action_items?.map((item) =>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        {item.action ? <h1 className='text-primary font-bold inline'>Action:<span className='font-normal inline'> {item.action}</span></h1> : null}
                        {item.deadline ? <h1 className='text-primary font-bold'>Deadline: <span className='font-normal'>{item.deadline}</span></h1> : null}
                      </div>
                    )}
                  </Modal>
                </div>
              ) : null}
              {(documentAnalysis.termination_conditions?.length !== 0) ? (
                <div className='flex flex-col justify-between items-center rounded-xl bg-tertiary p-5 w-1/5' onClick={() => { setTerminationExpanded(true) }}>
                  <Player
                    autoplay
                    loop
                    src={terminationAnim}
                    style={{ width: width * 0.2 }}
                  />
                  <h1 className='text-bg text-lg font-bold'>
                    Action Items
                  </h1>
                  <Modal isOpen={terminationExpanded} onClose={() => { setTerminationExpanded(false) }} title='Termination Conditions'>
                    {documentAnalysis.termination_conditions?.map((item) =>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        {item ? <h1 className='text-primary font-bold inline'>Condition:<span className='font-normal inline'> {item}</span></h1> : null}
                      </div>
                    )}
                  </Modal>
                </div>
              ) : null}
            </div>
          </div>
          <div className='h-screen bg-tertiary flex flex-row justify-between items-center gap-4 px-4'>
            <div className='flex flex-col flex-1 justify-between gap-5'>
              <h1 className='text-bg text-6xl font-extralight text-center'>Risks!</h1>
              <div className='flex flex-row flex-wrap gap-3 justify-center'>
                {(documentAnalysis.risks?.general?.length !== 0) ?
                  <div className='flex flex-col justify-between items-center w-1/3 rounded-lg p-5 bg-red-300' onClick={() => { setGeneralRiskExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={generalrisk}
                      style={{ width: width * 0.25 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg'>
                      General
                    </h1>
                    <Modal isOpen={generalRiskExpanded} onClose={() => { setGeneralRiskExpanded(false) }} title='General Risks' slideDirection='left'>
                      {documentAnalysis.risks?.general?.map((item) =>
                        <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                          {item.risk ? <h1 className='text-primary font-bold inline'>Action:<span className='font-normal inline'> {item.risk}</span></h1> : null}
                          {item.impact ? <h1 className='text-primary font-bold'>Deadline: <span className='font-normal'>{item.impact}</span></h1> : null}
                          {item.likelihood ? <h1 className='text-primary font-bold'>Likelyhood: <span className='font-normal'>{item.likelihood}</span></h1> : null}
                          {item.concerning ? <h1 className='text-primary font-bold'>Concerting: <span className='font-normal'>{item.concerning}</span></h1> : null}
                        </div>
                      )}
                    </Modal>
                  </div>
                  : null}
                {(documentAnalysis.risks?.legal?.length !== 0) ?
                  <div className='flex flex-col justify-between items-center w-1/3 rounded-lg p-5 bg-red-300' onClick={() => { setLegalRiskExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={legalrisk}
                      style={{ width: width * 0.25 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg'>
                      Legal
                    </h1>
                    <Modal isOpen={legalRiskExpanded} onClose={() => { setLegalRiskExpanded(false) }} title='Legal Risks' slideDirection='left'>
                      {documentAnalysis.risks?.legal?.map((item) =>
                        <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                          {item.risk ? <h1 className='text-primary font-bold inline'>Action:<span className='font-normal inline'> {item.risk}</span></h1> : null}
                          {item.impact ? <h1 className='text-primary font-bold'>Deadline: <span className='font-normal'>{item.impact}</span></h1> : null}
                          {item.likelihood ? <h1 className='text-primary font-bold'>Likelyhood: <span className='font-normal'>{item.likelihood}</span></h1> : null}
                          {item.concerning ? <h1 className='text-primary font-bold'>Concerting: <span className='font-normal'>{item.concerning}</span></h1> : null}
                        </div>
                      )}
                    </Modal>
                  </div>
                  : null}
                {(documentAnalysis.risks?.financial?.length !== 0) ?
                  <div className='flex flex-col justify-between items-center w-1/3 rounded-lg p-5 bg-red-300' onClick={() => { setFinancialRiskExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={financialrisk}
                      style={{ width: width * 0.25 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg'>
                      Financial
                    </h1>
                    <Modal isOpen={financialRiskExpanded} onClose={() => { setFinancialRiskExpanded(false) }} title='Financial Risks' slideDirection='left'>
                      {documentAnalysis.risks?.financial?.map((item) =>
                        <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                          {item.risk ? <h1 className='text-primary font-bold inline'>Action:<span className='font-normal inline'> {item.risk}</span></h1> : null}
                          {item.impact ? <h1 className='text-primary font-bold'>Deadline: <span className='font-normal'>{item.impact}</span></h1> : null}
                          {item.likelihood ? <h1 className='text-primary font-bold'>Likelyhood: <span className='font-normal'>{item.likelihood}</span></h1> : null}
                          {item.concerning ? <h1 className='text-primary font-bold'>Concerting: <span className='font-normal'>{item.concerning}</span></h1> : null}
                        </div>
                      )}
                    </Modal>
                  </div>
                  : null}
                {(documentAnalysis.risks?.reputational?.length !== 0) ?
                  <div className='flex flex-col justify-between items-center w-1/3 rounded-lg p-5 bg-red-300' onClick={() => { setReputationalRiskExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={reputationalrisk}
                      style={{ width: width * 0.25 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg'>
                      Reputational
                    </h1>
                    <Modal isOpen={reputationalRiskExpanded} onClose={() => { setReputationalRiskExpanded(false) }} title='Reputational Risks' slideDirection='left'>
                      {documentAnalysis.risks?.reputational?.map((item) =>
                        <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                          {item.risk ? <h1 className='text-primary font-bold inline'>Action:<span className='font-normal inline'> {item.risk}</span></h1> : null}
                          {item.impact ? <h1 className='text-primary font-bold'>Deadline: <span className='font-normal'>{item.impact}</span></h1> : null}
                          {item.likelihood ? <h1 className='text-primary font-bold'>Likelyhood: <span className='font-normal'>{item.likelihood}</span></h1> : null}
                          {item.concerning ? <h1 className='text-primary font-bold'>Concerting: <span className='font-normal'>{item.concerning}</span></h1> : null}
                        </div>
                      )}
                    </Modal>
                  </div>
                  : null}
              </div>
            </div>
            <div className="border-l-4 border-bg " style={{ height: width * 0.9 }}></div>
            <div>
              <h1 className='text-bg text-6xl font-extralight text-center mb-5'>Extras!</h1>
              <div className='flex flex-row flex-wrap gap-3 justify-center flex-1'>
                {documentAnalysis.review_recommendations ?
                  <div className='flex flex-col justify-center gap-5 items-center w-4/12 aspect-square rounded-lg p-5 bg-bg' onClick={() => { setReviewExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={reviewAnim}
                      style={{ width: width * 0.30 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg text-center'>
                      Review Recommendations
                    </h1>
                    <Modal isOpen={reviewExpanded} onClose={() => { setReviewExpanded(false) }} title='Review Recommendations' slideDirection='right'>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        <h1 className='text-primary  inline'>{documentAnalysis.review_recommendations}</h1>
                      </div>
                    </Modal>
                  </div>
                  : null}
                {documentAnalysis.user_protection_tips ?
                  <div className='flex flex-col justify-center gap-5 items-center w-4/12 aspect-square rounded-lg p-5 bg-bg' onClick={() => { setProtectionExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={protectionAnim}
                      style={{ width: width * 0.20 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg text-center'>
                      User Protection Tips
                    </h1>
                    <Modal isOpen={protectionExpanded} onClose={() => { setProtectionExpanded(false) }} title='User Protection Tips' slideDirection='right'>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        <h1 className='text-primary  inline'>{documentAnalysis.user_protection_tips}</h1>
                      </div>
                    </Modal>
                  </div>
                  : null}
                {documentAnalysis.overall_analysis ?
                  <div className='flex flex-col justify-center gap-5 items-center w-4/12 aspect-square rounded-lg p-5 bg-bg' onClick={() => { setOverallExpanded(true) }}>
                    <Player
                      autoplay
                      loop
                      src={overallAnim}
                      style={{ width: width * 0.20 }}
                    />
                    <h1 className='text-darkbg font-bold text-lg text-center'>
                      Overall Analysis
                    </h1>
                    <Modal isOpen={overallExpanded} onClose={() => { setOverallExpanded(false) }} title='Overall Analysis' slideDirection='right'>
                      <div className='rounded-lg p-5 my-1 bg-bg flex flex-col'>
                        <h1 className='text-primary  inline'>{documentAnalysis.overall_analysis}</h1>
                      </div>
                    </Modal>
                  </div>
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row flex-1 h-screen bg-bg p-4 pt-20 justify-between items-center">
          <div className="flex flex-col items-center justify-evenly flex-1">
            <Player
              autoplay
              loop
              src={documentAnim}
              style={{ width: width }}
            />
            <h1 className="text-3xl font-bold text-darkbg">
              CaseWise Document Analyzer!
            </h1>
          </div>
          <div className="border-l-4 border-darkbg " style={{ height: width * 0.8 }}></div>
          <div className="flex flex-col items-center justify-center gap-2 flex-1">
            <div className="bg-secondary p-5 rounded-xl w-5/6">
              <h1 className="text-darkbg font-semibold">Upload your contract, agreement, or legal document, and let us transform it into a clear, easy-to-read summary. Find out what's important, identify potential risks, and see any hidden details—all in one place</h1>
            </div>
            <div className="bg-secondary p-5 rounded-xl w-5/6">
              <h1 className="text-darkbg font-semibold">No more legal jargon—just a simple, informative breakdown of everything you need to know about your document.</h1>
            </div>
            <label className="custom-file-upload w-5/6 rounded-xl p-5 bg-tertiary text-secondary cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                aria-label="Upload PDF file"
                className="hidden"
              />
              <h1 className="text-bg">Your Legal Documents go Here!</h1>
            </label>
          </div>
        </div>
      )
  );
};

export default ContractSummarizer;
