import Link from "next/link";
import { unstable_cache } from "next/cache";
import dashboardData from "../../data/dashbord.json";
import { WindowSelector, ForceRevalidateButton } from "../ISRControls";
import CountdownTimer from "../CountdownTimer";
import { isrCache, type CacheEntry } from "./cache";

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

// --- Production: unstable_cache (uses Vercel's shared Data Cache across serverless instances) ---
// One stable wrapper per window size, created once at module scope.
const prodFetchers = new Map<number, (id: number) => Promise<{ data: DashboardInfo | null; generatedAt: string }>>();

function getProdCachedData(numericId: number, windowSeconds: number) {
  if (!prodFetchers.has(windowSeconds)) {
    prodFetchers.set(
      windowSeconds,
      unstable_cache(
        async (id: number) => {
          const item = dashboardData.find((d: DashboardInfo) => d.id === id) as DashboardInfo | undefined;
          return { data: item ?? null, generatedAt: new Date().toISOString() };
        },
        [`isr-dashboard-w${windowSeconds}`],
        { revalidate: windowSeconds, tags: [`isr-${windowSeconds}`] }
      )
    );
  }
  return prodFetchers.get(windowSeconds)!(numericId);
}

// --- Dev: module-level Map with manual TTL (single process, no serverless cold starts) ---
function getDevCachedData(numericId: number, windowSeconds: number) {
  const key = `${numericId}-${windowSeconds}`;
  const now = Date.now();
  const entry = isrCache.get(key);

  if (entry && now < entry.expiresAt) return entry;

  const item = dashboardData.find((d: DashboardInfo) => d.id === numericId) as DashboardInfo | undefined;
  const fresh: CacheEntry = {
    data: item ?? null,
    generatedAt: new Date().toISOString(),
    expiresAt: now + windowSeconds * 1000,
  };
  isrCache.set(key, fresh);
  return fresh;
}

function getCachedData(numericId: number, windowSeconds: number) {
  return process.env.NODE_ENV === "production"
    ? getProdCachedData(numericId, windowSeconds)
    : getDevCachedData(numericId, windowSeconds);
}

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

  const { data, generatedAt } = await getCachedData(numericId, windowSeconds);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Dashboard not found</p>
      </div>
    );
  }

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
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Data generated at
              </p>
              <p className="font-mono text-purple-700 font-medium">
                {new Date(generatedAt).toLocaleString()}
              </p>
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
                generatedAt={generatedAt}
              />
            </div>
          </div>

          <ForceRevalidateButton tag={`${numericId}`} />

          <p className="text-xs text-slate-400 mt-3 text-center">
            Force-revalidate marks the cache as stale — the next refresh
            generates fresh data
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
            This page uses{" "}
            <code className="font-mono bg-slate-100 px-1 rounded">
              unstable_cache
            </code>{" "}
            with a{" "}
            <span className="font-semibold text-purple-700">
              {windowSeconds}s
            </span>{" "}
            revalidation window to simulate ISR behaviour. The data timestamp
            stays frozen between requests and only updates after the window
            expires. In production, you would use{" "}
            <code className="font-mono bg-slate-100 px-1 rounded">
              export const revalidate = {windowSeconds}
            </code>{" "}
            on the page for full route-level ISR.
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
