import Link from "next/link";
import dashboardData from "../data/dashbord.json";

type dashboardInfo = {
  id: number;
  name: string;
  date: string;
  revenue: number;
  users: number;
  slug:string;
  region: string;
  growth: number;
};

export default async function DashboardPage() {
  const data = dashboardData;
  if (data.length === 0) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Server-side rendered dashboard
        </h1>
        <p className="font-normal my-2 text-sm text-gray-600">
          This dashboard is rendered on the server at request time (SSR). Click any card below to open a page that is pre-rendered as static site generation (SSG).
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d: dashboardInfo) => (
            <Link
              href={`/ssg/${d.id}`}
              key={d.id}
              className="bg-white cursor-pointer hover:shadow-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
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
                  {d.growth}%
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
