import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      isHistoryOpen: false,
      toggleHistory: () =>
        set((state) => ({ isHistoryOpen: !state.isHistoryOpen })),

      historial: [],
      addToHistorial: (item) =>
        set((state) => ({
          historial: [item, ...state.historial].slice(0, 20),
        })),
      loadFromHistory: (item) =>
        set({
          code: item.inputCode,
          result: item.result,
        }),
      itemToDelete: null,
      setItemToDelete: (id) => set({ itemToDelete: id }),
      removeFromHistorial: (id) =>
        set((state) => ({
          historial: state.historial.filter((item) => item.id !== id),
        })),

      code: "",
      result: null,
      isLoading: false,
      setCode: (newCode) => set({ code: newCode }),
      clearResult: () => set({ result: null }),
      analyzeCode: async (code) => {
        set({ isLoading: true, result: "Analizando..." });
        try {
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.result) {
            const nuevoItem = {
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              inputCode: code,
              result: data.result,
            };

            set({ result: data.result });
            get().addToHistorial(nuevoItem);
          }
        } catch (error) {
          console.log(error);
          set({ result: "Error al analizar el código." });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "mi-app-storage" },
  ),
);
