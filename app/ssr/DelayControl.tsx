"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DelayControl({ current }: { current: number }) {
  const router = useRouter();
  const [delay, setDelay] = useState(current);

  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex-1 min-w-52">
        <div className="flex justify-between mb-1">
          <label className="text-sm font-semibold text-slate-700">
            Server Delay (simulated)
          </label>
          <span className="text-sm font-bold text-green-700">{delay}ms</span>
        </div>
        <input
          type="range"
          min={0}
          max={3000}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>0ms (instant)</span>
          <span>3000ms</span>
        </div>
      </div>

      <button
        onClick={() => router.push(`/ssr?delay=${delay}`)}
        className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition text-sm"
      >
        Apply Delay
      </button>
    </div>
  );
}
