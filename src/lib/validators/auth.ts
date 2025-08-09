import { z } from 'zod'

export const formSignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})
export type FormSignUpSchema = z.infer<typeof formSignUpSchema>

export const formSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export type FormSignInSchema = z.infer<typeof formSignInSchema>
