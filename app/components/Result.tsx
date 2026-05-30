import { Check, Copy } from "lucide-react";
import { useCopy } from "../hooks/usecopy";
import { useStore } from "@/store/useStore";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useEffect, useState } from "react";

export function Result() {
  const { copied, handleCopy } = useCopy();
  const { result, isLoading } = useStore();
  const [displayedResult, setDisplayedResult] = useState("");
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let resetTimeout: NodeJS.Timeout | null = null;

    if (result) {
      // Reset displayed text asynchronously to avoid setState in effect
      resetTimeout = setTimeout(() => {
        setDisplayedResult("");
        let i = 0;
        interval = setInterval(() => {
          setDisplayedResult(result.slice(0, i));
          i++;
          if (i > result.length && interval) {
            clearInterval(interval);
          }
        }, 10);
      }, 0);
    }

    return () => {
      if (resetTimeout) clearTimeout(resetTimeout);
      if (interval) clearInterval(interval);
    };
  }, [result]);
  return (
    <div className="col-span-1 md:col-span-5 flex flex-col">
      <div className="flex items-center justify-between mt-[-40px] h-10">
        <div />
        {!isLoading && result && (
          <button
            onClick={() => handleCopy(result)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs mb-4 text-gray-400 hover:bg-slate-700 transition"
          >
            {copied ? (
              <Check size={12} className="text-green-400" />
            ) : (
              <Copy size={12} />
            )}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        )}
      </div>
      <div className="prose prose-invert prose-sm max-w-none custom-scroll h-[300px] md:h-[600px] w-full overflow-y-auto rounded-2xl border border-white/20 bg-slate-950 p-4 text-gray-400">
        {isLoading ? (
          "Intentando entender qué intentaste hacer aquí..."
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {displayedResult || "Esperando código..."}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
