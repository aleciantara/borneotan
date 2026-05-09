import { listStats } from "@/lib/db"

export async function GET() {
  const stats = await listStats()

  return Response.json({ stats })
}