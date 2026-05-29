import { useStore } from "@/store/useStore";

export function CodeInput() {
  const { code, setCode } = useStore();
  return (
    <div className="col-span-1 md:col-span-5 flex flex-col">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="custom-scroll h-[300px] md:h-[600px] w-full resize-none rounded-2xl border border-white/20 bg-slate-950 p-4 text-sm text-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        placeholder="function helloWorld() { ... }"
      />
    </div>
  );
}
