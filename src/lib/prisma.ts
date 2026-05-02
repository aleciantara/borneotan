import { PrismaClient } from '@/generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

function createPrismaClient() {
  const url = new URL(process.env.DATABASE_URL!)
  const host = url.hostname === 'localhost' ? '127.0.0.1' : url.hostname
  const adapter = new PrismaMariaDb({
    host,
    port: url.port ? Number(url.port) : 3306,
    user: url.username || undefined,
    password: url.password || undefined,
    database: url.pathname.replace(/^\//, '') || undefined,
  })
  return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma