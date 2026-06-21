"use client";
import { useState, useEffect } from "react";

export default function RenderedAt({ isoString }: { isoString: string }) {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    setDisplay(new Date(isoString).toLocaleString());
  }, [isoString]);

  return (
    <p className="font-mono text-slate-800">{display ?? isoString}</p>
  );
}
