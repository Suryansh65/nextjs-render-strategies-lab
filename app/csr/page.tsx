"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StrategyBanner from "../components/StrategyBanner";

type DashboardInfo = {
  id: number;
  name: string;
  date: string;
  slug: string;
  revenue: number;
  users: number;
  region: string;
  growth: number;
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-slate-200 rounded w-36" />
        <div className="h-6 bg-slate-200 rounded-full w-16" />
      </div>
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}

type FetchSignal = { n: number; ms: number };

export default function CSRDashboard() {
  const [data, setData] = useState<DashboardInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [delay, setDelay] = useState(800);
  const [fetchDuration, setFetchDuration] = useState<number | null>(null);
  const [renderedAt, setRenderedAt] = useState<string>("");
  // Changing this object triggers a new fetch; ms captures the delay at click time
  const [signal, setSignal] = useState<FetchSignal>({ n: 0, ms: 800 });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const start = performance.now();
      await new Promise<void>((r) => setTimeout(r, signal.ms));
      const res = await fetch("/api/dashboard");
      const json: DashboardInfo[] = await res.json();
      if (!cancelled) {
        setData(json);
        setFetchDuration(Math.round(performance.now() - start));
        setRenderedAt(new Date().toLocaleString());
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [signal]);

  const handleRefetch = () => {
    setLoading(true);
    setData([]);
    setSignal({ n: Date.now(), ms: delay });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition"
          >
            ← Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Client-Side Rendering
          </h1>
        </div>

        <StrategyBanner strategy="CSR" />

        {/* Controls + Metrics */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex-1 min-w-52">
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-slate-700">
                  API Delay (simulated)
                </label>
                <span className="text-sm font-bold text-blue-700">
                  {delay}ms
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={3000}
                step={100}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0ms (instant)</span>
                <span>3000ms</span>
              </div>
            </div>
            <button
              onClick={handleRefetch}
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
            >
              {loading ? "Fetching…" : "Refetch Data"}
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Rendered in
              </p>
              <p className="font-bold text-blue-700">Browser (Client)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Data loaded at
              </p>
              <p className="font-mono text-slate-800">
                {renderedAt || (loading ? "Fetching…" : "—")}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Total fetch time
              </p>
              <p className="font-bold text-slate-800">
                {fetchDuration !== null ? `${fetchDuration}ms` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : data.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {d.name}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        d.growth > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {(d.growth * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Date</span>
                      <span>{d.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Revenue</span>
                      <span className="font-semibold text-green-600">
                        ₹{d.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Users</span>
                      <span>{d.users.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Region</span>
                      <span>{d.region}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
