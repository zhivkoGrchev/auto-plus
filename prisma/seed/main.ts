import { PrismaClient } from '@/generated/prisma'
import data from './data'

async function main() {
  const prisma = new PrismaClient()
  try {
    // Remove existing data to avoid duplicates
    await prisma.carModel.deleteMany({})
    await prisma.carMake.deleteMany({})

    // Seed car makes and models
    for (const model of data.carModels) {
      // Create car make
      const carMake = await prisma.carMake.create({
        data: {
          name: model.make.name,
        },
      })

      // Create the car model with the connected make
      await prisma.carModel.create({
        data: {
          name: model.name,
          make: {
            connect: { id: carMake.id },
          },
        },
      })
    }

    console.log('Seeding completed successfully.')
  } catch (error) {
    console.error('Error during seeding:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
