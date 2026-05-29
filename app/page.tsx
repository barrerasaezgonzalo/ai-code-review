"use client";
import { CodeInput } from "./components/CodeInput";
import { Header } from "./components/Header";
import { Modes } from "./components/Modes";
import { Result } from "./components/Result";
import { modes } from "./constants";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="mx-auto mt-8 mb-8 pb-8 w-full max-w-7xl rounded-3xl font-mono">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <CodeInput />
        <Modes modes={modes} />
        <Result />
      </div>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} className="mt-8" />
      </a>
    </div>
  );
}
