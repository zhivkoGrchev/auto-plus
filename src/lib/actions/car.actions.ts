'use server'
import { prisma }  from '@/db'
import type { CarBrand, CarModel } from '../generated/prisma'
import { toJson } from '../utils'
import { insertCarSchema } from '../validators'

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
export async function createCar(formData: FormData): Promise<void> {
  try {
    const parsedData = insertCarSchema.parse({
      brandId: formData.get('brandId'),
      modelId: formData.get('modelId'),
      year: Number(formData.get('year')),
      color: formData.get('color'),
      transmission: formData.get('transmission'),
      fuelType: formData.get('fuelType'),
      mileage: Number(formData.get('mileage')),
      vin: formData.get('vin'),
      price: Number(formData.get('price')),
      description: formData.get('description') || undefined,
    })

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
