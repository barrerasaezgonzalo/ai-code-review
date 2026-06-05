import Image from "next/image";
import { History, MessageSquareOff } from "lucide-react";
import { useStore } from "@/store/useStore";

export function Header() {
  const { toggleHistory, clearResult, setCode } = useStore();

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-800 pb-6 gap-6">
      <div className="flex flex-col">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={100}
          className="mb-4 w-48 md:w-[300px]"
        />
        <p className="text-gray-500 text-sm">Tu asistente de desarrollo:</p>
        <p className="text-gray-500 text-sm max-w-md">
          Listo para resolver tus dudas técnicas y para humillar (con cariño) la
          calidad de tu código.
        </p>
      </div>

      <div className="flex gap-4 w-full md:w-auto justify-start md:justify-end">
        <button
          onClick={() => {
            clearResult();
            setCode("");
          }}
          className="text-gray-400 text-sm hover:text-white transition flex items-center gap-2 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-xl border border-gray-700 whitespace-nowrap cursor-pointer"
        >
          <MessageSquareOff size={20} />
          Limpiar
        </button>
        <button
          onClick={() => {
            toggleHistory();
          }}
          className="text-gray-400 text-sm hover:text-white transition flex items-center gap-2 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-xl border border-gray-700 whitespace-nowrap cursor-pointer"
        >
          <History size={20} />
          Historial
        </button>
      </div>
    </header>
  );
}
