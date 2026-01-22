import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/client";

function createPrismaClient() {
  const connectionString = `${process.env.DATABASE_URL}`;
  // Supabase provides a Postgres connection string; PrismaPg works in all environments (local + Vercel).
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = createPrismaClient();
