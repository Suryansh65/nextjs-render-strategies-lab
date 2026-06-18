import Link from "next/link";
import { getDashboardDataMOCK } from "../lib/dashboard";
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

export default async function ISRListPage() {
  const data: DashboardInfo[] = await getDashboardDataMOCK();

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
            Incremental Static Regeneration
          </h1>
        </div>

        <StrategyBanner strategy="ISR" />

        <p className="text-sm text-slate-500 mb-6">
          Click any card to open its ISR detail page. Each detail page uses{" "}
          <code className="font-mono bg-slate-100 px-1 rounded">
            unstable_cache
          </code>{" "}
          to cache data with a configurable revalidation window — you can change
          the window and force-revalidate on the detail page.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
            <Link
              href={`/isr/${d.id}`}
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
              <p className="mt-4 text-purple-600 font-semibold text-sm">
                View ISR detail →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
