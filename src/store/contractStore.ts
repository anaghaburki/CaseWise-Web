import { create } from 'zustand';

interface ContractState {
  contractText: string;
  summary: string;
  risks: string[];
  setContractText: (text: string) => void;
  setSummary: (summary: string) => void;
  setRisks: (risks: string[]) => void;
}

export const useContractStore = create<ContractState>((set) => ({
  contractText: '',
  summary: '',
  risks: [],
  setContractText: (text) => set({ contractText: text }),
  setSummary: (summary) => set({ summary }),
  setRisks: (risks) => set({ risks }),
}));
