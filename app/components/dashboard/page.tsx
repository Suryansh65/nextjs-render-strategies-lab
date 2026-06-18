import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>

          <div className="flex items-center gap-6">
            <Link
              href="/csr"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              CSR
            </Link>

            <Link
              href="/ssr"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              SSR
            </Link>

            <Link
              href="/ssg"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              SSG
            </Link>

            <Link
              href="/isr"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              ISR
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Rendering Strategies
          </h2>

          <p className="text-slate-500 mt-2">
            Compare different rendering approaches in Next.js.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* CSR */}
          <Link href="/csr">
            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  CSR
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Client Side Rendering
              </h2>

              <p className="text-slate-600 mb-4">
                Data is fetched and rendered in the browser after the page
                loads.
              </p>

              <div className="space-y-2 text-sm text-slate-500">
                <p>✅ Great for dashboards</p>
                <p>✅ Interactive applications</p>
                <p>❌ Poor SEO</p>
              </div>

              <div className="mt-6 text-blue-600 font-semibold">
                Learn More →
              </div>
            </div>
          </Link>

          {/* SSR */}
          <Link href="/ssr">
            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  SSR
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Server Side Rendering
              </h2>

              <p className="text-slate-600 mb-4">
                HTML is generated on the server for every request.
              </p>

              <div className="space-y-2 text-sm text-slate-500">
                <p>✅ Better SEO</p>
                <p>✅ Fresh data</p>
                <p>❌ Higher server load</p>
              </div>

              <div className="mt-6 text-green-600 font-semibold">
                Learn More →
              </div>
            </div>
          </Link>

          {/* SSG */}
          <Link href="/ssg">
            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                  SSG
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Static Site Generation
              </h2>
             

              <p className="text-slate-600 mb-4">
                Pages are generated at build time for fast delivery.
              </p>

              <div className="space-y-2 text-sm text-slate-500">
                <p>✅ Fast load times</p>
                <p>✅ Great SEO</p>
                <p>❌ Rebuild required for updates</p>
              </div>

              <div className="mt-6 text-teal-600 font-semibold">
                Learn More →
              </div>
            </div>
          </Link>

          {/* ISR */}
          <Link href="/isr">
            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  ISR
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Incremental Static Regeneration
              </h2>

              <p className="text-slate-600 mb-4">
                Static pages are regenerated in the background after a specified
                time.
              </p>

              <div className="space-y-2 text-sm text-slate-500">
                <p>✅ Fast performance</p>
                <p>✅ Good SEO</p>
                <p>✅ Lower server cost</p>
              </div>

              <div className="mt-6 text-purple-600 font-semibold">
                Learn More →
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
