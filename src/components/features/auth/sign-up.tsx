'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from '@/lib/auth/client'
import { type SignUpData, SignUpSchema } from '@/lib/validators/auth'
import { signUp } from '@/server/actions/auth.actions'

const INITIAL_FORM_DATA: SignUpData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
} as const

export const SignUp = () => {
  const t = useTranslations('SignUpPage')
  const e = useTranslations('Validation.errors')
  const router = useRouter()
  const { refetch } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({ defaultValues: INITIAL_FORM_DATA, resolver: zodResolver(SignUpSchema) })

  const handleFormSubmit = async (formData: SignUpData) => {
    const { data, error } = await signUp(formData)
    if (error) {
      toast(error.message)
      return
    }
    toast(data)
    refetch()
    router.push('/admin')
  }

  return (
    <Card className="min-w-md">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="name">
            {t('name')}
          </Label>
          <Input id="name" {...register('name')} />
          {errors.name?.message && <span className="mx-2 text-xs text-red-600">{e(errors.name.message)}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="email">
            {t('email')}
          </Label>
          <Input id="email" {...register('email')} />
          {errors.email?.message && <span className=" mx-2 text-xs text-red-600">{e(errors.email.message)}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="password">
            {t('password')}
          </Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password?.message && <span className="mx-2 text-xs text-red-600">{e(errors.password.message)}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="confirmPassword">
            {t('confirmPassword')}
          </Label>
          <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword?.message && <span className="mx-2 text-xs text-red-600">{e(errors.confirmPassword.message)}</span>}
        </fieldset>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button type="button" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : <UserPlus />} {t('signUpButton')}
        </Button>
        <Link className="text-center" href="/auth/sign-in">
          {t('alreadyHaveAccount')}
          <br />
          {t('signIn')}
        </Link>
      </CardFooter>
    </Card>
  )
}
