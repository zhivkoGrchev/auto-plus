import { z } from 'zod'

export const AddLocationSchema = z.object({
  contactPerson: z.string().min(2, 'requiredContactPerson'),
  phone: z
    .string()
    .regex(/^\+?[0-9]\d{1,14}$/, 'invalidPhoneNumber')
    .min(4, 'invalidPhoneNumber'),
  email: z.email('invalidEmail'),
  address: z.string().min(2, 'requiredAddress'),
  city: z.string().min(2, 'requiredCity'),
  postcode: z.string().min(5, '').max(6, 'requiredPostcode'),
  isMain: z.boolean().optional(),
})

export const EditLocationSchema = AddLocationSchema.partial()

export type AddLocationData = z.infer<typeof AddLocationSchema>
export type EditLocationData = z.infer<typeof EditLocationSchema>
