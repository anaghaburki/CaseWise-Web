import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import {create} from 'zustand'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

type state = {
  messageList: ChatItem[];
  contextHistory: Content[];
};

type actions = {
  getChatResponse: (chatItem: ChatItem) => Promise<void>;
};

type loaders = {
  responseLoading: boolean,
}

const useStore = create<state & actions & loaders>((set, get) => ({
  messageList: [],
  contextHistory: [],

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
      alert(
        "Unknown Lawbot Error"
      );
    } finally {
      set({ responseLoading: false });
    }
  },
}));

export default useStore;