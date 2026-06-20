export type CacheEntry = {
  data: {
    id: number;
    name: string;
    date: string;
    revenue: number;
    users: number;
    slug: string;
    region: string;
    growth: number;
  } | null;
  generatedAt: string;
  expiresAt: number;
};

// Shared module-level cache — persists across requests in the same server process.
export const isrCache = new Map<string, CacheEntry>();
