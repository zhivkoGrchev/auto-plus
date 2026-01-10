import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaPg } from '@prisma/adapter-pg'
import ws from 'ws'
import { PrismaClient } from '@/prisma/generated/client'

function createPrismaClient() {
  const isProduction = process.env.NODE_ENV === 'production'
  const isVercel = process.env.VERCEL === '1'
  const useNeonAdapter = isProduction || isVercel
  const connectionString = `${process.env.DATABASE_URL}`

  if (useNeonAdapter) {
    // Use Neon adapter for production/serverless environments
    neonConfig.webSocketConstructor = ws
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter })
  }
  // Use regular Prisma Client for local development
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const prisma = createPrismaClient()
