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
    <div>
      <h1>{data.name}</h1>
      <p>Region: {data.region}</p>
      <p>Revenue: ₹{data.revenue}</p>
      <p>Users: {data.users}</p>
      <p>Growth: {data.growth}%</p>
    </div>
  );
}
