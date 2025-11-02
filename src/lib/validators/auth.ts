import { z } from 'zod'
import { useTranslations } from 'next-intl'

export const useSignUpSchema = () => {
  const t = useTranslations('AuthValidations')

  return z
    .object({
      name: z.string().min(1, t('name')),
      email: z.string().email(t('email')),
      password: z.string().min(8, t('password')),
      confirmPassword: z.string().min(8, t('password')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('confirmPassword'),
      path: ['confirmPassword'],
    })
}

export const useSignInSchema = () => {
  const t = useTranslations('AuthValidations')

  return z.object({
    email: z.string().email(t('email')),
    password: z.string().min(8, t('password')),
  })
}

export type SignUpData = z.infer<ReturnType<typeof useSignUpSchema>>
export type SignInData = z.infer<ReturnType<typeof useSignInSchema>>
