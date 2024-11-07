import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { create } from "zustand";
import { arrayBufferToBase64 } from "../utils/helperfunctions";
import { documentPrompt } from "../utils/prompts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

type state = {
  messageList: ChatItem[];
  contextHistory: Content[];
  documentAnalysis: DocumentAnalysis | null;
};

type actions = {
  getChatResponse: (chatItem: ChatItem) => Promise<void>;
  getDocumentAnalysis: (file: File) => Promise<void>;
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
    } catch (error) {
      alert("Unknown Lawbot Error");
    } finally {
      set({ responseLoading: false });
    }
  },

  getDocumentAnalysis: async (file: File) => {
    set({ responseLoading: true });
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
          const jsonResponse = JSON.parse(result.response.text());
          set({ documentAnalysis: jsonResponse });
        }, 3000);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
    } finally {
      set({ responseLoading: false });
    }
  },
}));

export default useStore;
