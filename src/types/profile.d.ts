import type { Prisma } from '@prisma-client'

export type ProfileExtended = Prisma.ProfileGetPayload<{
  include: { locations: true }
}>
