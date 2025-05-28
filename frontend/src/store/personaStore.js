import { create } from 'zustand';

const usePersonaStore = create(set => ({
  selectedPersona: null,
  setSelectedPersona: persona => set({ selectedPersona: persona }),
  clearSelectedPersona: () => set({ selectedPersona: null }),
}));

export default usePersonaStore;
