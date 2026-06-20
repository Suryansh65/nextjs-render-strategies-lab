"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WINDOW_OPTIONS = [10, 30, 60, 120];

export function WindowSelector({
  current,
  dashboardId,
}: {
  current: number;
  dashboardId: string;
}) {
  const router = useRouter();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        Revalidation Window
      </p>
      <div className="flex gap-2 flex-wrap">
        {WINDOW_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => router.push(`/isr/${dashboardId}?window=${opt}`)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              current === opt
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt}s
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-2">
        In real code: <code className="font-mono">export const revalidate = {current}</code>
      </p>
    </div>
  );
}

export function ForceRevalidateButton({ cacheKey }: { cacheKey: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleClick = () => {
    setStatus("loading");
    localStorage.removeItem(`isr-cache-${cacheKey}`);
    setStatus("done");
    setTimeout(() => {
      router.refresh();
      setStatus("idle");
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      disabled={status !== "idle"}
      className="w-full mt-4 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-60 text-sm"
    >
      {status === "idle" && "Force Revalidate Now"}
      {status === "loading" && "Revalidating..."}
      {status === "done" && "Done — refreshing page..."}
    </button>
  );
}
