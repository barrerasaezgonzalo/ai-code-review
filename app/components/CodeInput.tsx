import { useStore } from "../../store/useStore";
import { MessageSquareOff, Play } from "lucide-react";

export function CodeInput() {
  const { code, setCode, analyzeCode, isLoading, clearResult } = useStore();
  return (
    <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
      <div className="bg-green-900/40 border border-2 border-green-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold">Editor de Código</h2>
          <button
            onClick={() => {
              clearResult();
              setCode("");
            }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <MessageSquareOff size={20} />
          </button>
        </div>
        <div className="bg-black/40 border border-gray-800 rounded-xl overflow-hidden flex font-mono text-sm h-full">
          <div className="bg-gray-950 p-4 text-gray-600 text-right select-none border-r border-gray-800">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
              <div key={n} className="leading-6">
                {n}
              </div>
            ))}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow bg-transparent text-green-400 p-4 focus:outline-none resize-none leading-6 custom-scroll flex-grow "
            placeholder="Pega tu código aquí..."
            spellCheck="false"
          />
        </div>
        <button
          onClick={() => analyzeCode(code)}
          disabled={isLoading || !code?.trim()}
          className="mt-6 w-fit cursor-pointer p-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition flex justify-center items-center gap-2 disabled:opacity-50 px-4"
        >
          <Play size={16} className={isLoading ? "animate-spin" : ""} />
          {isLoading ? "Analizando..." : "Analizar Proyecto"}
        </button>
      </div>
    </div>
  );
}
