import Link from "next/link";
import dashboardData from "../../data/dashbord.json";
import BuildBanner from "../BuildBanner";

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

function getDashboardData(id: string): DashboardInfo | undefined {
  return dashboardData.find(
    (item: DashboardInfo) => item.id === parseInt(id)
  );
}

export function generateStaticParams() {
  return dashboardData.map((post: DashboardInfo) => ({
    id: post.id.toString(),
  }));
}

export default async function SSGDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getDashboardData(id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Dashboard not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/ssg"
            className="text-sm text-slate-500 hover:text-slate-700 transition"
          >
            ← SSG List
          </Link>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold">
            SSG
          </span>
        </div>

        <BuildBanner pageId={id} />

        {/* Dashboard detail */}
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm mb-6">
          <p className="text-sm uppercase tracking-widest text-slate-500">
            {post.region} dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
            {post.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Updated on {new Date(post.date).toLocaleDateString()}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Revenue
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              ₹{post.revenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Active Users
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {post.users.toLocaleString()}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Growth
            </p>
            <p
              className={`mt-3 text-3xl font-semibold ${
                post.growth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {(post.growth * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Performance Summary
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Performance metrics for the {post.region} region. This entire page
            — including this data — was embedded into static HTML at build time.
            No database or API was contacted when you loaded this page.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Dashboard ID
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {post.id}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Slug
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 font-mono">
                {post.slug}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
