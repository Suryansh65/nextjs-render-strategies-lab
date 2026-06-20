import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isrCache } from "../../isr/[id]/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { tag } = body as { tag?: string };

  if (!tag || typeof tag !== "string") {
    return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production") {
    // Vercel Data Cache: revalidateTag clears the unstable_cache entry across all instances
    revalidateTag(`isr-${tag}`);
  } else {
    // Dev: clear the matching entries from the module-level Map
    for (const key of isrCache.keys()) {
      if (key.startsWith(tag + "-")) isrCache.delete(key);
    }
  }

  return NextResponse.json({ revalidated: true, tag });
}
