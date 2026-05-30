import { ModesProps } from "../types";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { loadingMessages } from "../constants";
import { ModeList } from "./ModeList";
import { Analyze } from "./Analyze";
import { AnalysisStatus } from "./AnalysisStatus";

export function Modes({ modes }: ModesProps) {
  const currentMode = useStore((state) => state.mode);
  const { setMode, analyzeCode, code, mode, isLoading } = useStore();
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [, setMessageIndex] = useState(0);
  const [, setSeconds] = useState(0);

  const handleAnalyze = () => {
    if (!code || code.trim().length === 0) {
      setIsEmptyError(true);
      setTimeout(() => setIsEmptyError(false), 5000);
      return;
    }
    analyzeCode(code, mode);
  };

  useEffect(() => {
    let messageInterval: NodeJS.Timeout | null = null;
    let timerInterval: NodeJS.Timeout | null = null;
    let resetTimeout: NodeJS.Timeout | null = null;

    if (isLoading) {
      messageInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 5000);

      timerInterval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      // Reset asynchronously to avoid synchronous setState inside effect
      resetTimeout = setTimeout(() => {
        setMessageIndex(0);
        setSeconds(0);
      }, 0);
    }

    return () => {
      if (messageInterval) clearInterval(messageInterval);
      if (timerInterval) clearInterval(timerInterval);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, [isLoading]);

  return (
    <div className="md:col-span-2 flex flex-col gap-4 w-[200px]">
      <div className="flex flex-col gap-3">
        {modes.map((m) => {
          return (
            <ModeList
              key={m.id}
              m={m}
              isLoading={isLoading}
              setMode={setMode}
              currentMode={currentMode}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <Analyze
          handleAnalyze={handleAnalyze}
          isLoading={isLoading}
          isEmptyError={isEmptyError}
        />

        {isEmptyError && (
          <p className="text-center text-xs text-red-500 font-medium">
            Escribe algo, no puedo auditar tu imaginación.
          </p>
        )}

        <AnalysisStatus isLoading={isLoading} />
      </div>
    </div>
  );
}
