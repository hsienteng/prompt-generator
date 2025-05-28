import { create } from 'zustand';

const useConfigureStore = create(set => ({
  selectedSmallTalk: null,
  selectedDifficulty: null,
  setSelectedSmallTalk: smallTalk => set({ selectedSmallTalk: smallTalk }),
  setSelectedDifficulty: difficulty => set({ selectedDifficulty: difficulty }),
  clearConfigureOptions: () => set({ selectedSmallTalk: null, selectedDifficulty: null }),
}));

export default useConfigureStore;
