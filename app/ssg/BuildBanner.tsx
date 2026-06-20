"use client";
import { useState, useEffect } from "react";

export default function BuildBanner({ pageId }: { pageId: string }) {
  const [builtAt, setBuiltAt] = useState<string | null>(null);

  useEffect(() => {
    const key = `ssg-built-at-${pageId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setBuiltAt(stored);
    } else {
      const now = new Date().toLocaleString();
      localStorage.setItem(key, now);
      setBuiltAt(now);
    }
  }, [pageId]);

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 mb-6 flex flex-wrap gap-6 text-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 mb-1">
          Rendered in
        </p>
        <p className="font-bold text-teal-800">Server (build time only)</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 mb-1">
          Built at
        </p>
        <p className="font-mono text-slate-800">{builtAt ?? "..."}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          This is frozen — refresh as many times as you like
        </p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 mb-1">
          Pre-built via
        </p>
        <p className="font-mono text-slate-700 text-xs bg-white px-2 py-1 rounded border border-teal-200">
          generateStaticParams()
        </p>
      </div>
    </div>
  );
}
