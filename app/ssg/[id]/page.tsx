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

async function getDashboardData(id: string) {
  const data = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
    cache: "force-cache", //Explicit SSG in Next.js 15
  });
  console.log("data",data);
  return data.json();
}

// Inbuilt method to tell Next.js which slugs to pre-build at build time
export async function generateStaticParams() {
  const posts: dashboardInfo[] = await fetch(
    "http://localhost:3000/api/dashboard",
  ).then((r) => r.json());
  return posts.map((post: dashboardInfo) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getDashboardData(id);
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
