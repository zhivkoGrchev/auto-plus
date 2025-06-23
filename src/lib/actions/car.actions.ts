'use server'
import { prisma } from '@/db'
import type { CarBrand, CarModel } from '../generated/prisma'
import { toJson } from '../utils'
import { insertCarSchema } from '../validators'
import type AddCarData from '../interfaces/add-car-data'

export async function getCarBrands(): Promise<CarBrand[]> {
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
export async function createCar(carData: AddCarData): Promise<void> {
  try {
    const parsedData = insertCarSchema.parse(carData)

    console.log('Parsed Car Data:', parsedData)

    await prisma.car.create({
      data: parsedData,
    })
  } catch (error) {
    console.error('Error creating car:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
