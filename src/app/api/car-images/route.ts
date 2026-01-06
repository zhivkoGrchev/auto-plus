// app/api/car-images/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { carId, imageUrl, imageHash, order } = body
    const carImage = await prisma.carImage.create({
      data: {
        carId,
        imageUrl,
        imageHash,
        order,
      },
    })

    return NextResponse.json({ success: true, data: carImage })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create car image' }, { status: 500 })
  }
}
