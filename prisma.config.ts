import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const databaseDirectUrl = process.env.DATABASE_DIRECT_URL
if (!databaseDirectUrl) throw new Error('DATABASE_DIRECT_URL environment variable is not set')

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed/main.ts',
  },
  datasource: {
    url: databaseDirectUrl,
  },
})
