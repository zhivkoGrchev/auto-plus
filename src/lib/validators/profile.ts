import { z } from 'zod'
import { AddLocationSchema } from './location'

export const AddProfileWithLocationSchema = z.object({
  slug: z.string().min(2, 'message.invalidSlug'),
  company: z.string().nullable(),
  imageUrl: z.string(),
  imageCid: z.string().nullable(),
  location: AddLocationSchema,
})

export const EditProfileSchema = AddProfileWithLocationSchema.omit({ location: true }).partial()

export type AddProfileWithLocationData = z.infer<typeof AddProfileWithLocationSchema>
export type EditProfileData = z.infer<typeof EditProfileSchema>
