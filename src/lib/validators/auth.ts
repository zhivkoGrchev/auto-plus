import { z } from 'zod'
import { useTranslations } from 'next-intl'

export const useSignUpSchema = () => {
  const t = useTranslations('AuthValidations')

  return z.object({
    name: z.string().min(1, t('name')),
    email: z.string().email(t('email')),
    password: z.string().min(8, t('password')),
  })
}
export type SignUpSchema = z.infer<Awaited<ReturnType<typeof useSignUpSchema>>>

export const useSignInSchema = () => {
  const t = useTranslations('AuthValidations')

  return z.object({
    email: z.string().email(t('email')),
    password: z.string().min(8, t('password')),
  })
}
export type SignInSchema = z.infer<Awaited<ReturnType<typeof useSignInSchema>>>
