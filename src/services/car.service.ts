import type { CarExtended } from '@/lib/types/car'
import { prisma } from '@/prisma'

export const getCarsByProfileId = async (id: string): Promise<Return<CarExtended[]>> => {
  try {
    const cars = await prisma.car.findMany({
      where: { listedOnWebsite: true, profileId: id },
      include: { brand: true, model: true, images: true },
      orderBy: { createdAt: 'desc' },
    })
    if (!cars) return { data: undefined, error: { message: 'Cars not found' } }
    return { data: cars, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching cars by profile id:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}
