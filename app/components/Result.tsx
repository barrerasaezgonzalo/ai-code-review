import { useStore } from "@/store/useStore";
import {
  Check,
  Code,
  Copy,
  Flame,
  ListCollapse,
  SquareSigma,
} from "lucide-react";
import { useClipboard } from "../hooks/usecopy";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CopyButton = ({ text }: { text: string }) => {
  const { copied, copyToClipboard } = useClipboard();
  return (
    <button
      onClick={() => copyToClipboard(text)}
      className="absolute top-4 right-4 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition cursor-pointer"
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
};

const CodeBlock = ({
  code,
  language = "javascript",
}: {
  code: string;
  language: string;
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      customStyle={{
        margin: 0,
        background: "transparent",
        padding: "0",
        fontSize: "0.875rem",
      }}
      wrapLines={true}
      wrapLongLines={true}
    >
      {code || ""}
    </SyntaxHighlighter>
  );
};

export default function Result() {
  const { result } = useStore();

  return (
    <div className="grid grid-cols-12 gap-6 flex-grow">
      <div className="col-span-12 bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-green-400 font-bold mb-2 uppercase text-xs flex gap-2">
          <ListCollapse size={16} /> Explicación
        </h3>
        <p className="text-gray-300 text-sm">
          {result?.explicacion || "Analizando..."}
        </p>
      </div>

      <div className="relative col-span-12 lg:col-span-7 bg-gray-900/40 border border-gray-800 rounded-2xl p-6 ">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs flex gap-2 ">
          <Code size={16} /> Código Refactorizado
        </h3>
        <CopyButton text={result?.codigo_sugerido || ""} />

        <div className="overflow-hidden w-full">
          <CodeBlock code={result?.codigo_sugerido} language="javascript" />
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5 grid gap-6 ">
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-purple-400 font-bold text-xs uppercase flex gap-2">
            <SquareSigma size={16} /> Complejidad ciclómática :{" "}
            <span className="text-white">
              {result?.complejidad_ciclomatica || "-"}
            </span>
          </h3>
          <p className="text-gray-300 text-sm mt-2">
            1-10 Programa Simple, sin mucho riesgo <br />
            11-20 Más complejo, riesgo moderado <br />
            21-50 Complejo, Programa de alto riesgo <br />
            50 Programa no testeable, Muy alto riesgo
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-900/30 rounded-2xl p-6">
          <h3 className="text-yellow-500 font-bold mb-2 uppercase text-xs flex gap-2">
            <Flame size={16} /> Roast
          </h3>
          <p className="italic text-gray-200 text-sm">
            {result?.roast || "Esperando crítica..."}
          </p>
        </div>
      </div>
    </div>
  );
}
