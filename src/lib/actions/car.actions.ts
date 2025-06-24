'use server'
import { prisma } from '@/db'
import type { CarBrand, CarModel } from '../generated/prisma'
import { toJson } from '../utils'
import { insertCarSchema } from '../validators'
import type AddCarData from '../interfaces/add-car-data'
import { ZodError } from 'zod'

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
export async function createCar(carData: AddCarData): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
  try {
    const parsedData = insertCarSchema.parse(carData)

    console.log('Parsed Car Data:', parsedData)

    await prisma.car.create({
      data: parsedData,
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating car:', error)
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      // Format Zod errors into a more usable structure
      const formattedErrors: Record<string, string[]> = {}

      for (const err of error.errors) {
        const field = err.path.join('.') || 'form'
        if (!formattedErrors[field]) {
          formattedErrors[field] = []
        }
        formattedErrors[field].push(err.message)
      }

      return { success: false, errors: formattedErrors }
    }

    // For other errors, return a generic error
    return {
      success: false,
      errors: { form: ['An unexpected error occurred. Please try again.'] },
    }
  } finally {
    await prisma.$disconnect()
  }
}
