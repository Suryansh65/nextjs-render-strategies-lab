type Strategy = "CSR" | "SSR" | "SSG" | "ISR";

const config: Record<
  Strategy,
  {
    title: string;
    where: string;
    when: string;
    description: string;
    pros: string[];
    cons: string[];
    proof: string;
    badgeCls: string;
    borderCls: string;
    bgCls: string;
    dividerCls: string;
  }
> = {
  CSR: {
    title: "Client-Side Rendering",
    where: "Browser (JavaScript)",
    when: "After page loads — on every client-side fetch",
    description:
      "The server sends an empty HTML shell. The browser downloads JS, then fetches data and renders the UI on the client.",
    pros: [
      "Instant page transitions after first load",
      "Great for highly interactive UIs",
      "Server handles minimal work per request",
    ],
    cons: [
      "Empty initial HTML → poor SEO",
      "Visible loading flash on first visit",
      "Slower time-to-content vs SSR/SSG",
    ],
    proof:
      "Watch the skeleton appear before data. Open DevTools → Network and see the /api/dashboard call fired by the browser after page load. Set a delay and click Refetch — the skeleton stays visible for exactly that long.",
    badgeCls: "bg-blue-100 text-blue-700",
    borderCls: "border-blue-200",
    bgCls: "bg-blue-50",
    dividerCls: "border-blue-200",
  },
  SSR: {
    title: "Server-Side Rendering",
    where: "Server (Node.js) — on every request",
    when: "At request time, before the browser receives any HTML",
    description:
      "The server generates the full HTML (with data) for every request. The browser receives a complete page — no loading state.",
    pros: [
      "Full HTML for crawlers → excellent SEO",
      "No loading flash — data arrives with the page",
      "Always serves the freshest data",
    ],
    cons: [
      "Every request hits the server → higher load",
      "Slow APIs increase TTFB (user waits for the whole page)",
      "HTML cannot be cached at the CDN edge",
    ],
    proof:
      "Set a server delay and click Apply. Notice the browser tab shows a loading spinner and stalls — the entire page is blocked. Unlike CSR, there is no skeleton; the page only appears once the server finishes. Refresh repeatedly — the timestamp changes every time.",
    badgeCls: "bg-green-100 text-green-700",
    borderCls: "border-green-200",
    bgCls: "bg-green-50",
    dividerCls: "border-green-200",
  },
  SSG: {
    title: "Static Site Generation",
    where: "Server — at build time only",
    when: "Once during `next build` — never at request time",
    description:
      "HTML is generated once during the build and served as static files from a CDN. No server involved when users visit the page.",
    pros: [
      "Fastest possible load — CDN-served pre-built HTML",
      "Excellent SEO — full HTML for every crawler",
      "Zero server cost per request",
    ],
    cons: [
      "Data is frozen at build time",
      "Full rebuild required to update content",
      "Not suitable for personalized or real-time data",
    ],
    proof:
      'The "Built at" timestamp on each detail page never changes no matter how many times you refresh — it was stamped during the build. View the page source and the data is already in the HTML.',
    badgeCls: "bg-teal-100 text-teal-700",
    borderCls: "border-teal-200",
    bgCls: "bg-teal-50",
    dividerCls: "border-teal-200",
  },
  ISR: {
    title: "Incremental Static Regeneration",
    where: "Server — regenerated in background after revalidation window",
    when: "At build time, then after the revalidation window expires",
    description:
      "Pages are pre-generated like SSG, but can be refreshed after a configurable time window. Stale content is served instantly while fresh content generates in the background.",
    pros: [
      "Fast CDN responses — no per-request server work",
      "Data can update without a full rebuild",
      "Best balance of speed, SEO, and freshness",
    ],
    cons: [
      "Users may see stale data until revalidation completes",
      "Cache state is harder to reason about",
      "Revalidation requires a real incoming request to trigger",
    ],
    proof:
      'The "Data generated at" timestamp stays frozen until the window expires (or you force-revalidate). Refresh multiple times within the window — same timestamp. After the window expires, the next refresh triggers background regeneration and the timestamp updates.',
    badgeCls: "bg-purple-100 text-purple-700",
    borderCls: "border-purple-200",
    bgCls: "bg-purple-50",
    dividerCls: "border-purple-200",
  },
};

export default function StrategyBanner({ strategy }: { strategy: Strategy }) {
  const c = config[strategy];
  return (
    <div
      className={`rounded-2xl border ${c.borderCls} ${c.bgCls} p-6 mb-8`}
    >
      <div className="flex flex-wrap items-start gap-3 mb-4">
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold ${c.badgeCls}`}
        >
          {strategy}
        </span>
        <div>
          <p className="font-bold text-slate-800 leading-tight">{c.title}</p>
          <p className="text-sm text-slate-600 mt-1">{c.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Rendered in
          </p>
          <p className="text-slate-700">{c.where}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Rendered when
          </p>
          <p className="text-slate-700">{c.when}</p>
        </div>
        <div className="space-y-1">
          {c.pros.slice(0, 2).map((p) => (
            <p key={p} className="text-green-700 text-xs">
              ✓ {p}
            </p>
          ))}
          <p className="text-red-600 text-xs">✗ {c.cons[0]}</p>
        </div>
      </div>

      <div className={`pt-3 border-t ${c.dividerCls}`}>
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-600">How to verify: </span>
          {c.proof}
        </p>
      </div>
    </div>
  );
}
