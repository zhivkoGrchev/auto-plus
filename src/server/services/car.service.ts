import 'server-only'
import { prisma } from '@/server/db/prisma'
import type { CarExtended } from '@/types/car'

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

export const getCarById = async (id: string): Promise<Return<CarExtended>> => {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: { brand: true, model: true, images: { orderBy: { order: 'asc' } } },
    })
    if (!car) return { data: undefined, error: { message: 'Car not found' } }
    return { data: car, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching car by id:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}
