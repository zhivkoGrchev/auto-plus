import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

function createPrismaClient() {
  const isProduction = process.env.NODE_ENV === 'production'
  const isVercel = process.env.VERCEL === '1'
  const useNeonAdapter = isProduction || isVercel || true // Adjust this condition based on your environment
  
  if (useNeonAdapter) {
    // Use Neon adapter for production/serverless environments
    neonConfig.webSocketConstructor = ws
    const connectionString = `${process.env.DATABASE_URL}`
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter })
  }
    // Use regular Prisma Client for local development
    return new PrismaClient()
}

export const prisma = createPrismaClient()