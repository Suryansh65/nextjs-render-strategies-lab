import Link from "next/link";
import dashboardData from "../data/dashbord.json";
import StrategyBanner from "../components/StrategyBanner";

type DashboardInfo = {
  id: number;
  name: string;
  date: string;
  revenue: number;
  users: number;
  slug: string;
  region: string;
  growth: number;
};

export default function SSGListPage() {
  const isDev = process.env.NODE_ENV === "development";
  // In production this runs once at build time — the timestamp is frozen in the HTML.
  // In development Next.js re-renders every page on every request, so the timestamp changes.
  const builtAt = new Date().toLocaleString();
  const data = dashboardData as DashboardInfo[];

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
            Static Site Generation
          </h1>
        </div>

        <StrategyBanner strategy="SSG" />

        {isDev && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 mb-6 text-sm text-amber-800">
            <span className="font-semibold">⚠ Development mode:</span> Next.js
            re-renders every page on every request in dev, so the timestamp
            below changes on refresh. Run{" "}
            <code className="font-mono bg-amber-100 px-1 rounded">
              next build &amp;&amp; next start
            </code>{" "}
            to see the timestamp frozen at build time.
          </div>
        )}

        {/* Build Metrics */}
        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Rendered in
              </p>
              <p className="font-bold text-teal-700">Server (build time only)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Page built at
              </p>
              <p className="font-mono text-slate-800">{builtAt}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Refresh as many times as you want — this never changes until you
                rebuild
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                Server work per request
              </p>
              <p className="font-bold text-teal-700">None (CDN-served HTML)</p>
            </div>
          </div>
        </div>

        {/* Cards — click to open SSG detail pages */}
        <p className="text-sm text-slate-500 mb-4">
          Click any card to open its detail page — also pre-rendered at build
          time via{" "}
          <code className="font-mono bg-slate-100 px-1 rounded">
            generateStaticParams
          </code>
          .
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
            <Link
              href={`/ssg/${d.id}`}
              key={d.id}
              className="bg-white cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
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
              <p className="mt-4 text-teal-600 font-semibold text-sm">
                View SSG detail →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
