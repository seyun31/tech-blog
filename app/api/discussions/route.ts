import { NextResponse } from "next/server";
import { getDiscussionStats } from "@/lib/discussions";

export async function GET() {
  const stats = await getDiscussionStats();
  return NextResponse.json(stats);
}
