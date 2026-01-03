import type { CarImage } from '@prisma/client'

export type GaleryImage = Pick<CarImage, 'imageUrl' | 'imageHash'> & {
  imageFile?: File
}
