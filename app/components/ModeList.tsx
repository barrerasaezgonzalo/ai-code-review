import { LucideIcon } from "lucide-react";
import { ModeListProps } from "../types";

export function ModeList({
  m,
  isLoading,
  setMode,
  currentMode,
}: ModeListProps) {
  const Icon = m.icon as LucideIcon;
  return (
    <button
      disabled={isLoading}
      key={m.id}
      onClick={() => setMode(m.id)}
      className={`cursor-pointer text-left group relative flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm transition-all duration-200
                            ${
                              currentMode === m.id
                                ? "bg-green-900 text-white shadow-lg shadow-green-900/20"
                                : "bg-slate-800 text-gray-400 hover:bg-slate-700"
                            }`}
    >
      <Icon size={20} />
      <span>{m.label}</span>

      {!isLoading && (
        <span className="pointer-events-none absolute left-full ml-3 hidden w-48 rounded-lg border border-green-500/20 bg-green-950 p-2 text-center text-md text-green-400 shadow-xl group-hover:block">
          {m.desc}
        </span>
      )}
    </button>
  );
}
