import { X, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";
import { HistorialItem } from "../types";

interface SidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

export const Sidebar = ({ sidebarRef }: SidebarProps) => {
  const {
    isHistoryOpen,
    toggleHistory,
    historial,
    loadFromHistory,
    setItemToDelete,
  } = useStore();
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isHistoryOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleHistory}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full custom-scroll w-80 bg-[#121212] border-r border-gray-800 z-50 transition-transform duration-300 ease-in-out ${
          isHistoryOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-white font-bold mb-6 flex gap-4">
            Historial
            <button
              onClick={() => toggleHistory()}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </h2>

          <div className="flex flex-col gap-3 p-4 w-full overflow-x-hidden ">
            {historial?.length === 0 ? (
              <p className="text-gray-600 text-sm text-center italic">
                No hay análisis previos.
              </p>
            ) : (
              historial?.map((item: HistorialItem) => (
                <div key={item.id} className="relative group p-2 w-full">
                  <button
                    onClick={() => {
                      loadFromHistory(item);
                      toggleHistory();
                    }}
                    className="w-full max-w-full flex flex-col gap-1 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all text-left group"
                  >
                    <div className="flex justify-between items-center w-full ">
                      <span className="text-xs font-mono text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span
                        className={`text-[10px] py-0.5 mr-8 rounded-full ${item.result.complejidad_ciclomatica > 20 ? "bg-red-900/30 text-red-400" : "bg-green-900/30 text-green-400"}`}
                      >
                        Compjetidad: {item.result.complejidad_ciclomatica}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 pr-4 truncate w-full font-mono">
                      {item.inputCode.substring(0, 40)}...
                    </p>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setItemToDelete(item.id);
                    }}
                    className="absolute cursor-pointer top-2 right-2 p-2 text-gray-500 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 size={20} className="m2-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
