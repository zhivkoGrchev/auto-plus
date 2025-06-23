import type { Car, CarBrand, CarModel } from '@/lib/generated/prisma'

export default interface AddCarData extends Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'year' | 'mileage' | 'price'> {
  year: number | null
  mileage: number | null
  price: number | null
  description: string
  brands: CarBrand[]
  models: CarModel[]
}
