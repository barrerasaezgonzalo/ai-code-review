import { useState, useEffect } from "react";
import { loadingMessages } from "../constants";

// AnalysisStatus.tsx
export function AnalysisStatus({ isLoading }: { isLoading: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let messageInterval: NodeJS.Timeout | null = null;
    let timerInterval: NodeJS.Timeout | null = null;
    let resetTimeout: NodeJS.Timeout | null = null;

    if (isLoading) {
      messageInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 5000);
      timerInterval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
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

  if (!isLoading) return null;

  return (
    <div className="flex flex-col gap-1 mt-2">
      <p className="text-center text-xs text-gray-500 italic">
        Al usar modelos gratuitos, el análisis puede demorar unos segundos.
      </p>
      <p className="text-center text-xs text-green-600 italic animate-pulse">
        {loadingMessages[messageIndex]}
      </p>
      <div className="text-xs text-gray-600 font-mono text-center">
        Tiempo: {seconds}s | Procesando...
      </div>
    </div>
  );
}
