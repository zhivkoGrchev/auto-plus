import 'server-only'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma-client'

function createPrismaClient() {
  const connectionString = `${process.env.DATABASE_URL}`
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const prisma = createPrismaClient()
