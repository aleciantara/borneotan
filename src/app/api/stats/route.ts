import { NextResponse } from "next/server";
import { createStat, listStats } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  label: z.string().min(1).max(255),
  value: z.string().min(1).max(100),
});

export async function GET() {
  const stats = await listStats();
  return NextResponse.json(stats);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const stat = await createStat(parsed.data);
    return NextResponse.json(stat, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
