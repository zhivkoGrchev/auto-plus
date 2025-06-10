'use server'
import { PrismaClient } from '../generated/prisma'
import type { CarMake, CarModel } from '../generated/prisma'
import { toJson } from '../utils'

export async function getCarMakes(): Promise<CarMake[]> {
  const prisma = new PrismaClient()
  try {
    const carMakes = await prisma.carMake.findMany({})
    return toJson(carMakes)
  } catch (error) {
    console.error('Error fetching car makes:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
export async function getCarModelsByMake(makeId: string): Promise<CarModel[]> {
  const prisma = new PrismaClient()
  try {
    const carModels = await prisma.carModel.findMany({
      where: {
        makeId,
      },
    })
    return toJson(carModels)
  } catch (error) {
    console.error('Error fetching car models by make:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
