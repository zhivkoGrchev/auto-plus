'use server'
import { PrismaClient } from '../generated/prisma'
import type { CarBrand, CarModel } from '../generated/prisma'
import { toJson } from '../utils'

export async function getCarBrands(): Promise<CarBrand[]> {
  const prisma = new PrismaClient()
  try {
    const carBrands = await prisma.carBrand.findMany({})
    return toJson(carBrands)
  } catch (error) {
    console.error('Error fetching car makes:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
export async function getCarModelsByBrand(brandId: string): Promise<CarModel[]> {
  const prisma = new PrismaClient()
  try {
    const carModels = await prisma.carModel.findMany({
      where: {
        brandId,
      },
    })
    return toJson(carModels)
  } catch (error) {
    console.error('Error fetching car models by brand:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
