import { NextResponse } from "next/server";
import { isrCache } from "../../isr/[id]/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { tag } = body as { tag?: string };

  if (!tag || typeof tag !== "string") {
    return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
  }

  // Delete all cache entries for this dashboard id (across all window sizes)
  for (const key of isrCache.keys()) {
    if (key.startsWith(tag + "-")) isrCache.delete(key);
  }

  return NextResponse.json({ revalidated: true, tag });
}
