import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { tag } = body as { tag?: string };

  if (!tag || typeof tag !== "string") {
    return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
