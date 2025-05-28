import { create } from 'zustand';

const useProductStore = create(set => ({
  selectedProduct: null,
  setSelectedProduct: product => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useProductStore;
