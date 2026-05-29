import { LoaderCircle, Play } from "lucide-react";
import { AnalyzeProps } from "../types";

export function Analyze({
  handleAnalyze,
  isLoading,
  isEmptyError,
}: AnalyzeProps) {
  return (
    <button
      onClick={handleAnalyze}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white transition 
                    ${isLoading ? "bg-green-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}
                    ${isEmptyError ? "animate-pulse ring-2 ring-red-500" : ""}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <LoaderCircle size={20} className="animate-spin" />
          <span className="leading-none text-left">
            Revisando tus pecados...
          </span>
        </div>
      ) : (
        <>
          <Play size={16} />
          <span>{isEmptyError ? "¡Escribe algo!" : "Analizar"}</span>
        </>
      )}
    </button>
  );
}
