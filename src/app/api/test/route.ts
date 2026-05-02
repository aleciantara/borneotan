import { prisma } from "@/lib/prisma"

export async function GET() {
  const stats = await prisma.statistic.findMany()

  return Response.json({ stats })
}