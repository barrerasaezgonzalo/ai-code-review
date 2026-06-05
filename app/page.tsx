"use client";
import { useStore } from "../store/useStore";
import { useRef } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { Header } from "./components/Header";
import { CodeInput } from "./components/CodeInput";
import Result from "./components/Result";
import { Sidebar } from "./components/Sidebar";
import DeleteModal from "./components/DeleteModal";

export default function Dashboard() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isLoading, result, toggleHistory, isHistoryOpen, itemToDelete } =
    useStore();

  useOnClickOutside(sidebarRef, toggleHistory, isHistoryOpen);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-mono ">
      <Header />
      <div className="grid grid-cols-12 gap-8">
        <CodeInput />

        <div className="col-span-12 lg:col-span-7 h-full overflow-hidden custom-scroll">
          {!result && !isLoading ? (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-800 rounded-2xl text-gray-600">
              Esperando tu código.
            </div>
          ) : (
            <Result />
          )}
        </div>
      </div>
      <Sidebar sidebarRef={sidebarRef} />
      {itemToDelete && <DeleteModal />}
    </div>
  );
}
