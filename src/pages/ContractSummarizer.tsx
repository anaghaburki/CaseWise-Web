import { GoogleGenerativeAI } from "@google/generative-ai";
import { documentPrompt } from "../utils/prompts";
import React, { useState } from 'react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const ContractSummarizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>('');

  const getDocumentAnalysis = async (file: File) => {
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

        const result = await chat.sendMessage([documentPrompt, pdf]);
        const response = result.response;
        const text = response.text();
        setResponseText(text);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
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
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {responseText && (
        <div>
          <h3>Response:</h3>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default ContractSummarizer;