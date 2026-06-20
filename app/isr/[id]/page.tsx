import Link from "next/link";
import dashboardData from "../../data/dashbord.json";
import { WindowSelector, ForceRevalidateButton } from "../ISRControls";
import CountdownTimer from "../CountdownTimer";

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

export default async function ISRDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ window?: string }>;
}) {
  const { id } = await params;
  const { window: windowStr = "30" } = await searchParams;

  const numericId = parseInt(id);
  const windowSeconds = Math.min(Math.max(parseInt(windowStr) || 30, 5), 300);

  const data = dashboardData.find(
    (d: DashboardInfo) => d.id === numericId
  ) as DashboardInfo | undefined;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Dashboard not found</p>
      </div>
    );
  }

  // Always fresh from server — the client's localStorage is what creates the
  // "frozen until expiry" illusion, so this works on any serverless platform.
  const serverGeneratedAt = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/isr"
            className="text-sm text-slate-500 hover:text-slate-700 transition"
          >
            ← ISR List
          </Link>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
            ISR
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Incremental Static Regeneration
        </h1>

        {/* ISR Controls + Metrics */}
        <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm mb-6">
          <WindowSelector current={windowSeconds} dashboardId={id} />

          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs text-slate-400 mt-1">
                Refresh repeatedly — this stays frozen until cache expires
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Cache expires in
              </p>
              <CountdownTimer
                windowSeconds={windowSeconds}
                serverGeneratedAt={serverGeneratedAt}
                cacheKey={`${id}-${windowSeconds}`}
              />
            </div>
          </div>

          <ForceRevalidateButton cacheKey={`${id}-${windowSeconds}`} />

          <p className="text-xs text-slate-400 mt-3 text-center">
            Force-revalidate clears the local cache — the next refresh shows a fresh timestamp
          </p>
        </div>

        {/* Dashboard detail */}
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm mb-6">
          <p className="text-sm uppercase tracking-widest text-slate-500">
            {data.region} dashboard
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {data.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Updated on {new Date(data.date).toLocaleDateString()}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Revenue
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              ₹{data.revenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Active Users
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {data.users.toLocaleString()}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Growth
            </p>
            <p
              className={`mt-3 text-3xl font-semibold ${
                data.growth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {(data.growth * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            About this demo
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This page simulates ISR with a{" "}
            <span className="font-semibold text-purple-700">{windowSeconds}s</span>{" "}
            revalidation window. The frozen timestamp is stored in your browser
            and stays fixed until the window expires — just like a real ISR page
            serves the same static snapshot until its revalidation window passes.
            In production you would use{" "}
            <code className="font-mono bg-slate-100 px-1 rounded">
              export const revalidate = {windowSeconds}
            </code>{" "}
            on the page for true route-level ISR.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Dashboard ID
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {data.id}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Slug
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 font-mono">
                {data.slug}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
