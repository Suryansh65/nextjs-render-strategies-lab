import dashboardData from "../../data/dashbord.json";
type dashboardInfo = {
  id: number;
  name: string;
  date: string;
  revenue: number;
  users: number;
  slug: string;
  region: string;
  growth: number;
};

function getDashboardData(id: string): dashboardInfo | undefined {
  const data = dashboardData.find((item: dashboardInfo) => item.id === parseInt(id));
  return data;
}

// Inbuilt method to tell Next.js which slugs to pre-build at build time
export function generateStaticParams() {
  return dashboardData.map((post: dashboardInfo) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getDashboardData(id);

  if (!post) {
    return (
      <article className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
        <h1 className="text-xl">Dashboard not found</h1>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
      <h1 className="text-xl">Static Site Generation</h1>
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          {post.region} dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          {post.name}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Updated on {new Date(post.date).toLocaleDateString()}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Revenue
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            ${post?.revenue?.toLocaleString()}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Active Users
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {post?.users?.toLocaleString()}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Growth
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {post.growth}%
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Performance Summary
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          This dashboard shows the latest performance metrics for the{" "}
          {post.region} region, including revenue, user engagement, and growth
          rate.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Dashboard ID
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {post.id}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Slug
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {post.slug}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
