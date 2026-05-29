import { create } from "zustand";

export const useStore = create((set) => ({
  code: "",
  mode: "explicacion",
  result: "",
  isLoading: false,
  setCode: (newCode) => set({ code: newCode }),
  setMode: (newMode) => set({ mode: newMode }),
  analyzeCode: async (code, mode) => {
    set({ isLoading: true, result: "Analizando..." });
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ code, mode }),
      });
      if (response.status === 404) {
        throw new Error("404_NOT_FOUND");
      }
      const data = await response.json();
      set({ result: data.result });
    } catch (error) {
      console.log(error);
      set({ result: "Error al analizar el código." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
