import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { documentPrompt } from "../utils/prompts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const ContractSummarizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getDocumentAnalysis = async (file: File) => {
    setLoading(true); 
    setError('');
    setResponseText('');

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const chat = model.startChat({});
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const base64String = arrayBufferToBase64(arrayBuffer);
        const pdf = {
          inlineData: {
            data: base64String,
            mimeType: "application/pdf",
          },
        };

        setTimeout(async () => {
          const result = await chat.sendMessage([documentPrompt, pdf]);
          const text = result.response.text();
          setResponseText(text);
          setLoading(false); 
        }, 3000); 
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      setError('Error processing the document. Please try again.');
      console.error(error);
      setLoading(false); 
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      getDocumentAnalysis(file); 
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const byteArray = new Uint8Array(buffer);
    const binaryString = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return window.btoa(binaryString);
  };

  return (
    <div className="bg-bg p-5 rounded-lg flex flex-col items-center justify-center min-h-screen text-center">
      {loading ? (
        <div className="flex flex-col items-center">
          <iframe 
            src="https://lottie.host/embed/664e2d91-88d2-4c2b-9c35-e02dd8c7d6de/deYjWqiKor.json" 
            width="300" 
            height="300" 
            className="border-none mb-5" 
            title="Loading Animation">
          </iframe>
          <p className="text-primary text-lg">Hang tight, Analyzing...</p>
        </div>
      ) : (
        <>
          {!selectedFile && !responseText && (
            <>
              <h1 className="text-primary text-2xl">Contract Summarizer</h1>
              <p className="text-primary text-xl mb-5">
                We read between the lines so you don't have to
              </p>
              <iframe 
                src="https://lottie.host/embed/5f065666-33fa-4aa5-a350-156ec2e4e563/IVFabssVfX.json" 
                width="300" 
                height="300" 
                className="border-none mb-5" 
                title="Contract Animation"
              />
              <label className="custom-file-upload bg-primary text-secondary py-2 px-4 rounded cursor-pointer inline-block mt-5">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  aria-label="Upload PDF file"
                  className="hidden"
                />
                Choose File
              </label>
            </>
          )}

          {responseText && !loading && (
            <div className="bg-secondary p-2 rounded mt-5">
              <h3 className="text-primary">Response:</h3>
              <p>{responseText}</p>
            </div>
          )}

          {responseText && !loading && (
            <button
              onClick={() => { setSelectedFile(null); setResponseText(''); }}
              className="mt-5 py-2 px-3 bg-tertiary text-secondary rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ContractSummarizer;
