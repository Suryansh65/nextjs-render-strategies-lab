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

type paramsType = {
  params: Promise<{ id: number }>;
};

export async function getDashboardData(id: number) {
  const res = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
    next: { revalidate: 60 }, // ISR - Render new HTML with udpated data after 60 sec
  });
  return res.json();
}

export default async function DashboardPage({ params }: paramsType) {
  const { id } = await params;
  const data: dashboardInfo = await getDashboardData(id);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Incremental Site Regeneration</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{data.name}</h1>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-lg font-semibold text-slate-600">Region:</span>
            <span className="text-lg text-slate-900 font-medium">{data.region}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-lg font-semibold text-slate-600">Revenue:</span>
            <span className="text-lg text-green-600 font-bold">₹{data.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-lg font-semibold text-slate-600">Users:</span>
            <span className="text-lg text-blue-600 font-bold">{data.users.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-600">Growth:</span>
            <span className="text-lg text-purple-600 font-bold">{data.growth}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
