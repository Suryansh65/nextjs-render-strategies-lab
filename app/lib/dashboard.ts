export type DashboardInfo = {
  id: number;
  name: string;
  date: string;
  slug:string;
  revenue: number;
  users: number;
  region: string;
  growth: number;
};

export async function getDashboardDataMOCK(): Promise<DashboardInfo[]> {
  return [
    {
      id: 1,
      name: "Main Dashboard",
      slug: "main-dashboard",
      date: "2026-06-01",
      revenue: 12450.75,
      users: 532,
      region: "North America",
      growth: 0.07,
    },
    {
      id: 2,
      name: "Marketing Overview",
      slug: "marketing-overview",
      date: "2026-06-01",
      revenue: 8420,
      users: 320,
      region: "Europe",
      growth: -0.045,
    },
    {
      id: 3,
      name: "Sales Pipeline",
      slug: "sales-pipeline",
      date: "2026-06-01",
      revenue: 19230.5,
      users: 780,
      region: "APAC",
      growth: 0.12,
    },
    {
      id: 4,
      name: "Product Metrics",
      slug: "product-metrics",
      date: "2026-06-01",
      revenue: 5600,
      users: 210,
      region: "Latin America",
      growth: 0.03,
    },
    {
      id: 5,
      name: "Executive Summary",
      slug: "executive-summary",
      date: "2026-06-01",
      revenue: 30500.99,
      users: 1200,
      region: "Global",
      growth: 0.09,
    },
  ];
}
