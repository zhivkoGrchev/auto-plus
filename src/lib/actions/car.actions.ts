'use server'

import { prisma } from '@/db/prisma'
import type { CarBrand, CarModel } from '@prisma/client'
import type { CarExtended } from '../interfaces/car-extended'
import { toJson } from '../utils'
import { createInsertCarSchema } from '../validators/car'
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
    const schema = await createInsertCarSchema()
    const parsedData = schema.parse(carData)

    console.log('Parsed Car Data:', parsedData)

    await prisma.car.create({
      data: parsedData,
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating car:', error)
    if (error instanceof ZodError) {
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

    return {
      success: false,
      errors: { form: ['An unexpected error occurred. Please try again.'] },
    }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllCars(): Promise<CarExtended[]> {
  try {
    const cars = await prisma.car.findMany({
      include: {
        brand: true,
        model: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return toJson(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export async function getCarsWithPagination(
  page = 1,
  pageSize = 10
): Promise<{
  cars: CarExtended[]
  totalCount: number
  totalPages: number
  currentPage: number
}> {
  try {
    const skip = (page - 1) * pageSize

    const [cars, totalCount] = await Promise.all([
      prisma.car.findMany({
        include: {
          brand: true,
          model: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: pageSize,
      }),
      prisma.car.count(),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      cars: toJson(cars),
      totalCount,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching cars with pagination:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export async function searchCars(searchTerm: string): Promise<CarExtended[]> {
  try {
    const cars = await prisma.car.findMany({
      where: {
        OR: [
          {
            brand: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            model: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            color: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            vin: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        brand: true,
        model: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return toJson(cars)
  } catch (error) {
    console.error('Error searching cars:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export async function deleteCar(id: string): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
  try {
    await prisma.car.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    return { success: false, errors: { form: ['Failed to delete car.'] } }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getCarById(id: string): Promise<CarExtended | null> {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        brand: true,
        model: true,
      },
    })

    return car ? toJson(car) : null
  } catch (error) {
    console.error('Error fetching car by ID:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
