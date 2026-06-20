"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer({
  windowSeconds,
  generatedAt,
}: {
  windowSeconds: number;
  generatedAt: string;
}) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const expiresAt =
      new Date(generatedAt).getTime() + windowSeconds * 1000;

    const tick = () => {
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setRemaining(diff);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [generatedAt, windowSeconds]);

  if (remaining === null) return <span className="text-slate-400">...</span>;

  if (remaining === 0) {
    return (
      <span className="text-orange-600 font-semibold text-sm">
        Cache expired — refresh once to trigger regen, then refresh again to see fresh data
      </span>
    );
  }

  const pct = Math.round((remaining / windowSeconds) * 100);

  return (
    <div>
      <span className="font-mono font-bold text-purple-700 text-2xl">
        {remaining}s
      </span>
      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
        <div
          className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
