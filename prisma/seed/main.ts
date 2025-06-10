import { PrismaClient } from '@/lib/generated/prisma'
import data from './data'

async function main() {
  const prisma = new PrismaClient()
  try {
    await prisma.carModel.deleteMany({})
    await prisma.carMake.deleteMany({})

    for (const model of data.carModels) {
      const carMake = await prisma.carMake.create({
        data: {
          name: model.make.name,
        },
      })

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
