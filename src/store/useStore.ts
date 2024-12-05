import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { create } from "zustand";
import { arrayBufferToBase64 } from "../utils/helperfunctions";
import {
  documentPrompt,
  initialPrompt,
  predictionPrompt,
  newCasePrompt,
} from "../utils/prompts";
import {
  CaseData,
  CaseFiling,
  CasePrediction,
  ChatItem,
  DocumentAnalysis,
} from "@/global";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

type state = {
  messageList: ChatItem[];
  contextHistory: Content[];
  documentAnalysis: DocumentAnalysis | null;
  documentSummaryLines: string[] | null;
  casePrediction: CasePrediction | null;
  caseList: CaseData[];
  currentCase: CaseData | null;
};

type actions = {
  getChatResponse: (chatItem: ChatItem) => Promise<void>;
  getDocumentAnalysis: (file: File) => Promise<void>;
  loadInitialPrompt: () => Promise<void>;
  getCasePrediction: (file?: File | null, inputText?: string) => Promise<void>;
  initNewCase: (title: string, description: string) => Promise<void>;
};

type loaders = {
  responseLoading: boolean;
};

const useStore = create<state & actions & loaders>((set, get) => ({
  messageList: [],
  contextHistory: [],
  documentAnalysis: null,
  documentSummaryLines: null,
  casePrediction: null,
  caseList: [],
  currentCase: null,
  responseLoading: false,

  getChatResponse: async (chatItem: ChatItem) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: {
          responseMimeType: "text/plain",
        },
      });

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(chatItem.message);
      const response = result.response;
      const text = response.text();

      set({
        messageList: [
          ...get().messageList,
          {
            ai: true,
            message: text,
            time: new Date().toLocaleTimeString().slice(0, -3),
          },
        ],
      });

      set({
        contextHistory: history,
      });
    } catch (error) {
      alert(error);
    } finally {
      set({ responseLoading: false });
    }
  },

  getDocumentAnalysis: async (file: File) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const chat = model.startChat({
        history: history,
      });

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
          const jsonResponse = JSON.parse(result.response.text());
          set({ documentAnalysis: jsonResponse });
          set({ responseLoading: false });
        }, 3000);
      };

      reader.readAsArrayBuffer(file);

      set({
        contextHistory: history,
      });
    } catch (error) {
      console.error(error);
      set({ responseLoading: false });
    }
  },

  loadInitialPrompt: async () => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: {
          responseMimeType: "text/plain",
        },
      });

      const chat = model.startChat({
        history: history,
      });

      await chat.sendMessage(initialPrompt);
      set({
        contextHistory: history,
      });
    } catch (error) {
      alert(error);
    } finally {
      set({ responseLoading: false });
    }
  },

  getCasePrediction: async (
    file: File | null = null,
    inputText: string = ""
  ) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: {
          responseMimeType:
            "application/json",
        },
      });

      const chat = model.startChat({
        history: history,
      });

      if (file) {
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

          const result = await chat.sendMessage([predictionPrompt, pdf]);
          const jsonResponse = JSON.parse(result.response.text());
          set({ casePrediction: jsonResponse, responseLoading: false });
        };

        reader.readAsArrayBuffer(file);
      } else if (inputText !== "") {
        const result = await chat.sendMessage([predictionPrompt, inputText]);
        const jsonResponse = JSON.parse(result.response.text()) as CasePrediction;
        set({ casePrediction: jsonResponse, responseLoading: false });
      } else {
        throw new Error("Both file and inputText are missing");
      }

      set({
        contextHistory: history,
      });
    } catch (error) {
      console.error("Error getting case prediction:", error);
      set({ responseLoading: false });
    }
  },

  initNewCase: async (title: string, description: string) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(newCasePrompt(title, description));
      const response = result.response;
      const caseFiling: CaseFiling = JSON.parse(response.text()) as CaseFiling;

      const caseData: CaseData = {
        navigateStatus: 0,
        caseFiling: caseFiling,
        evidenceCollection: null,
        legalResearch: null,
        hearingManagement: null,
        caseResolution: null
      };

      set({
        caseList: [...get().caseList, caseData],
        currentCase: caseData,
        contextHistory: history,
      });
    } catch (error) {
      alert("Error Initiating a new case: " + error?.toString());
    } finally {
      set({ responseLoading: false });
    }
  },
}));

export default useStore;
