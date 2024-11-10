import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { create } from "zustand";
import { arrayBufferToBase64 } from "../utils/helperfunctions";
import { documentPrompt, initialPrompt } from "../utils/prompts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

type state = {
  messageList: ChatItem[];
  contextHistory: Content[];
  documentAnalysis: DocumentAnalysis | null;
};

type actions = {
  getChatResponse: (chatItem: ChatItem) => Promise<void>;
  getDocumentAnalysis: (file: File) => Promise<void>;
  loadInitialPrompt: () => Promise<void>;
};

type loaders = {
  responseLoading: boolean;
};

const useStore = create<state & actions & loaders>((set, get) => ({
  messageList: [],
  contextHistory: [],
  documentAnalysis: null,

  responseLoading: false,

  getChatResponse: async (chatItem: ChatItem) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
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
      alert("Unknown Lawbot Error");
    } finally {
      set({ responseLoading: false });
    }
  },

  getDocumentAnalysis: async (file: File) => {
    try {
      set({ responseLoading: true });

      const history = get().contextHistory;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
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
        model: "gemini-1.5-flash",
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
      alert("Unknown Lawbot Error");
    } finally {
      set({ responseLoading: false });
    }
  },
}));

export default useStore;
