import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { create } from "zustand";
import { arrayBufferToBase64 } from "../utils/helperfunctions";
import {
  documentPrompt,
  initialPrompt,
  predictionPrompt,
  newCasePrompt,
  getHearingAdvicePrompt,
  getResearchFindingsPrompt,
} from "../utils/prompts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

type State = {
  messageList: ChatItem[];
  contextHistory: Content[];
  documentAnalysis: DocumentAnalysis | null;
  documentSummaryLines: string[] | null;
  casePrediction: CasePrediction | null;
  caseList: CaseData[];
  currentCase: CaseData | null;
};

type Actions = {
  getChatResponse: (chatItem: ChatItem) => Promise<void>;
  getDocumentAnalysis: (file: File) => Promise<void>;
  loadInitialPrompt: () => Promise<void>;
  getCasePrediction: (file?: File | null, inputText?: string) => Promise<void>;
  initNewCase: (title: string, description: string) => Promise<void>;
  getLegalResearch: (caseData: CaseData) => Promise<void>;
  getHearingAdvice: (caseData: CaseData) => Promise<string>
};

type Loaders = {
  responseLoading: boolean;
};

const useStore = create<State & Actions & Loaders>((set, get) => ({
  messageList: [],
  contextHistory: [],
  documentAnalysis: null,
  documentSummaryLines: null,
  casePrediction: null,
  caseList: [],
  currentCase: null,
  responseLoading: false,

  getChatResponse: async (chatItem) => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "text/plain" },
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(chatItem.message);
      const response = await result.response.text();

      set({
        messageList: [
          ...get().messageList,
          {
            ai: true,
            message: response,
            time: new Date().toLocaleTimeString(),
          },
        ],
        contextHistory: history,
      });
    } catch (error) {
      console.error("Error getting chat response:", error);
    } finally {
      set({ responseLoading: false });
    }
  },

  getDocumentAnalysis: async (file) => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "application/json" },
      });

      const chat = model.startChat({ history });
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64String = arrayBufferToBase64(
            reader.result as ArrayBuffer
          );
          const pdf = {
            inlineData: { data: base64String, mimeType: "application/pdf" },
          };

          const result = await chat.sendMessage([documentPrompt, pdf]);
          const analysis = JSON.parse(await result.response.text());
          set({ documentAnalysis: analysis });
        } catch (error) {
          console.error("Error parsing document analysis:", error);
        } finally {
          set({ responseLoading: false });
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error analyzing document:", error);
      set({ responseLoading: false });
    }
  },

  loadInitialPrompt: async () => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "text/plain" },
      });

      const chat = model.startChat({ history });
      await chat.sendMessage(initialPrompt);
      set({ contextHistory: history });
    } catch (error) {
      console.error("Error loading initial prompt:", error);
    } finally {
      set({ responseLoading: false });
    }
  },

  getCasePrediction: async (file = null, inputText = "") => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "application/json" },
      });

      const chat = model.startChat({ history });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64String = arrayBufferToBase64(
              reader.result as ArrayBuffer
            );
            const pdf = {
              inlineData: { data: base64String, mimeType: "application/pdf" },
            };

            const result = await chat.sendMessage([predictionPrompt, pdf]);
            const prediction = JSON.parse(await result.response.text());
            set({ casePrediction: prediction });
          } catch (error) {
            console.error("Error parsing case prediction:", error);
          } finally {
            set({ responseLoading: false });
          }
        };

        reader.readAsArrayBuffer(file);
      } else if (inputText) {
        const result = await chat.sendMessage([predictionPrompt, inputText]);
        const prediction = JSON.parse(await result.response.text());
        set({ casePrediction: prediction });
      } else {
        throw new Error("Both file and inputText are missing");
      }

      set({ contextHistory: history });
    } catch (error) {
      console.error("Error getting case prediction:", error);
      set({ responseLoading: false });
    }
  },

  initNewCase: async (title, description) => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "application/json" },
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(newCasePrompt(title, description));
      const caseFiling: CaseFiling = JSON.parse(await result.response.text());

      const newCase: CaseData = {
        navigateStatus: 0,
        caseFiling,
        evidenceCollection: null,
        legalResearch: null,
        hearingManagement: null,
        caseResolution: null,
      };

      set({
        caseList: [...get().caseList, newCase],
        currentCase: newCase,
        contextHistory: history,
      });
    } catch (error) {
      console.error("Error initiating a new case:", error);
    } finally {
      set({ responseLoading: false });
    }
  },

  getLegalResearch: async (caseData: CaseData) => {
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

      const result = await chat.sendMessage(
        getResearchFindingsPrompt(caseData)
      );
      const response = result.response;
      const text = response.text();

      const researchFindings: LegalResearch[] = JSON.parse(
        text
      ) as LegalResearch[];

      set((state) => {
        const { caseList, currentCase } = state;
        if (!currentCase) return state;
        const updatedCaseList = caseList.map((caseItem) =>
          caseItem.caseFiling.caseTitle === currentCase.caseFiling?.caseTitle
            ? { ...caseItem, legalResearch: researchFindings }
            : caseItem
        );
        return {
          ...state,
          currentCase: {
            ...currentCase,
            legalResearch: researchFindings,
          },
          caseList: updatedCaseList,
        };
      });

      set({ contextHistory: history });
      alert(
        "ResearchFindings are now available!"
      );
    } catch (error) {
      alert("Error Getting research findings" + error?.toString());
    } finally {
      set({ responseLoading: false });
    }
  },

  getHearingAdvice: async (caseData: CaseData) => {
    try {
      set({ responseLoading: true });
      const history = get().contextHistory;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        generationConfig: { responseMimeType: "text/plain" },
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(getHearingAdvicePrompt(caseData));
      const advice = await result.response.text();

      return advice;
    } catch (error) {
      console.error("Error getting hearing advice:", error);
      return "";
    } finally {
      set({ responseLoading: false });
    }
  },
}));

export default useStore;
