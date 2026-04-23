'use server'

import type { CarBrand, CarModel } from '@prisma-client'
import type { AddCarData, AddCarImageData, EditCarData } from '@/lib/validators/car'
import { prisma } from '@/server/db/prisma'
import type { CarExtended } from '@/types/car'
import { deleteImage } from './pinata.actions'
import { getProfile } from './profile.actions'

export async function getCars(profileId: string, locationId: string): Promise<Return<CarExtended[]>> {
  try {
    const cars = await prisma.car.findMany({
      include: { brand: true, model: true, images: { orderBy: { order: 'asc' } } },
      where: { profileId, locationId },
      orderBy: { createdAt: 'desc' },
    })
    if (!cars.length) return { data: undefined, error: { message: 'There are no cars' } }
    return { data: cars, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching cars:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export async function addCar(formData: AddCarData, images: AddCarImageData[]): Promise<Return<Record<string, string>>> {
  try {
    const car = await prisma.car.create({
      data: { ...formData, images: { create: images } },
    })
    return { data: { id: car.id, message: 'Car was created successfully' }, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error creating car:', e.message)
    return { data: undefined, error: { message: 'An unexpected error occurred. Please try again.' } }
  }
}

export async function editCar(carId: string, formData: EditCarData): Promise<Return<Record<string, string>>> {
  try {
    await prisma.car.update({
      where: { id: carId },
      data: { ...formData, updatedAt: new Date() },
    })
    return { data: { id: carId, message: 'The car was updated' }, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error updating car:', e.message)
    return { data: undefined, error: { message: 'Failed to update car. Please try again.' } }
  }
}

export async function deleteCar(id: string): Promise<Return<string>> {
  try {
    const car = await prisma.car.findUnique({ where: { id }, include: { images: true } })
    if (!car) return { data: undefined, error: { message: 'Car not found.' } }

    const cidsToDelete: string[] = []
    //if (car.imageCid) cidsToDelete.push(car.imageCid)
    for (const image of car.images) {
      if (image.imageCid) cidsToDelete.push(image.imageCid)
    }

    await prisma.car.delete({ where: { id } })

    const deletePromises = cidsToDelete.map((cid) => deleteImage(cid))
    await Promise.allSettled(deletePromises)

    return { data: 'The car was Successfully deleted', error: undefined }
  } catch (error) {
    const e: Error = error as Error
    console.error('Error deleting car:', e.message)
    return { data: undefined, error: { message: 'Failed to delete car.' } }
  }
}

export async function toggleCarListing(carId: string, isListed: boolean): Promise<Return<string>> {
  try {
    await prisma.car.update({ where: { id: carId }, data: { listedOnWebsite: isListed, updatedAt: new Date() } })
    return { data: 'Listing status was successfully updated', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error toggling car listing:', e.message)
    return { data: undefined, error: { message: 'Failed to update listing status' } }
  }
}

export async function getCarBrands(): Promise<Return<CarBrand[]>> {
  try {
    const data = await prisma.carBrand.findMany({})
    return { data, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching car brands:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export async function getCarModelsByBrand(brandId: string): Promise<Return<CarModel[]>> {
  try {
    const data = await prisma.carModel.findMany({ where: { brandId } })
    return { data, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching car models by brand:', error)
    return { data: undefined, error: { message: e.message } }
  }
}

export async function getCarsCount(): Promise<Return<number>> {
  try {
    const { data: profile, error } = await getProfile()
    if (error) return { data: profile, error }
    const count = await prisma.car.count({ where: { profileId: profile.id, listedOnWebsite: true } })
    return { data: count, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error counting cars:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export async function getCarsTotalPrice(): Promise<Return<number>> {
  try {
    const { data: profile, error } = await getProfile()
    if (error) return { data: profile, error }
    const result = await prisma.car.aggregate({
      where: { profileId: profile.id, listedOnWebsite: true },
      _sum: { price: true },
    })
    return { data: result._sum.price ?? 0, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error calculating total car price:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}
