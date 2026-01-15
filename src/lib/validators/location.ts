import { z } from 'zod'

export const AddLocationSchema = z.object({
  contactPerson: z.string().min(2, 'message.requiredContactPerson'),
  phone: z
    .string()
    .regex(/^\+?[0-9]\d{1,14}$/, 'message.invalidPhoneNumber')
    .min(4, 'message.invalidPhoneNumber'),
  email: z.email('message.invalidEmail'),
  address: z.string().min(2, 'message.requiredAddress'),
  city: z.string().min(2, 'message.requiredCity'),
  postcode: z.string().min(5, '').max(6, 'message.requiredPostcode'),
  isMain: z.boolean().optional(),
})

export const EditLocationSchema = AddLocationSchema.partial()

export type AddLocationData = z.infer<typeof AddLocationSchema>
export type EditLocationData = z.infer<typeof EditLocationSchema>
