import type { CarImage } from '@/prisma/generated'

export type GaleryImage = Pick<CarImage, 'imageUrl' | 'imageHash'> & {
  imageFile?: File
}
