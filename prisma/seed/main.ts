import { PrismaClient } from '@/lib/generated/prisma'
import data from './data'

async function main() {
  const prisma = new PrismaClient()
  try {
    await prisma.carModel.deleteMany({})
    await prisma.carBrand.deleteMany({})

    for (const carBrand of data.carBrands) {
      // Create the car brand
      const brandCreated = await prisma.carBrand.create({
        data: {
          name: carBrand.name,
        },
      })

      // Create the car models for the brand
      for (const name of carBrand.carModels) {
        await prisma.carModel.create({
          data: {
            name,
            brand: {
              connect: { id: brandCreated.id },
            },
          },
        })
      }
    }

    console.log('Seeding completed successfully.')
  } catch (error) {
    console.error('Error during seeding:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
