"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer({
  windowSeconds,
  serverGeneratedAt,
  cacheKey,
}: {
  windowSeconds: number;
  serverGeneratedAt: string;
  cacheKey: string;
}) {
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const storageKey = `isr-cache-${cacheKey}`;
    const stored = localStorage.getItem(storageKey);
    let resolvedGeneratedAt = serverGeneratedAt;

    if (stored) {
      const parsed = JSON.parse(stored) as { generatedAt: string; expiresAt: number };
      if (Date.now() < parsed.expiresAt) {
        // Cache still valid — use the frozen timestamp
        resolvedGeneratedAt = parsed.generatedAt;
      } else {
        // Expired — use fresh server timestamp and reset
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            generatedAt: serverGeneratedAt,
            expiresAt: Date.now() + windowSeconds * 1000,
          })
        );
      }
    } else {
      // First visit — store the server timestamp
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          generatedAt: serverGeneratedAt,
          expiresAt: Date.now() + windowSeconds * 1000,
        })
      );
    }

    setGeneratedAt(resolvedGeneratedAt);

    const expiresAt = new Date(resolvedGeneratedAt).getTime() + windowSeconds * 1000;

    const tick = () => {
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setRemaining(diff);
      if (diff === 0) localStorage.removeItem(storageKey);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [cacheKey, windowSeconds, serverGeneratedAt]);

  if (remaining === null || generatedAt === null) {
    return <span className="text-slate-400">...</span>;
  }

  if (remaining === 0) {
    return (
      <span className="text-orange-600 font-semibold text-sm">
        Cache expired — refresh to regenerate
      </span>
    );
  }

  const pct = Math.round((remaining / windowSeconds) * 100);

  return (
    <div>
      <p className="font-mono text-purple-700 font-medium mb-1">
        Generated at: {new Date(generatedAt).toLocaleString()}
      </p>
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
