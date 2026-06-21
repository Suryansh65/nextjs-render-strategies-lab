import Link from "next/link";
import { getDashboardDataMOCK } from "@/app/lib/dashboard";
import StrategyBanner from "@/app/components/StrategyBanner";
import DelayControl from "./DelayControl";
import RenderedAt from "./RenderedAt";

async function getData(delayMs: number) {
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return getDashboardDataMOCK();
}

export default async function SSRPage({
  searchParams,
}: {
  searchParams: Promise<{ delay?: string }>;
}) {
  const { delay: delayStr = "0" } = await searchParams;
  const delay = Math.min(Math.max(parseInt(delayStr) || 0, 0), 3000);

  const data = await getData(delay);
  // ISO string from server — formatted on the client so it uses the user's local timezone
  const renderedAt = new Date().toISOString();

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
            Server-Side Rendering
          </h1>
        </div>

        <StrategyBanner strategy="SSR" />

        {/* Controls + Metrics */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-8">
          <DelayControl current={delay} />

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Rendered in
              </p>
              <p className="font-bold text-green-700">Server (per request)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                This page rendered at
              </p>
              <RenderedAt isoString={renderedAt} />
              <p className="text-xs text-slate-400 mt-0.5">
                Refresh the page — this timestamp changes every time
              </p>
            </div>
            {delay > 0 && (
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Server delay applied
                </p>
                <p className="font-bold text-orange-600">{delay}ms</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  The browser stalled for this long before any HTML arrived
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
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
