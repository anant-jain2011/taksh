import { create } from "zustand";

// 1. Create the store
const useStore = create((set) => ({
  user: null,
  setUser: (user: object) => set({ user }),
}));

export default useStore;