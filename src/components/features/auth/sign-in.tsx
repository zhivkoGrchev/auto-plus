'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader, LogIn } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'
import { signIn } from '@/lib/actions/auth.actions'
import { useSession } from '@/lib/auth/client'
import { useSignInSchema, type SignInData } from '@/lib/validators/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: SignInData = {
  email: '',
  password: '',
} as const

export const SignIn = () => {
  const t = useTranslations('SignInPage')
  const router = useRouter()
  const { refetch } = useSession()
  const schema = useSignInSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({ defaultValues: initialFormData, resolver: zodResolver(schema) })

  const handleFormSubmit = async (formData: SignInData) => {
    const { data, error } = await signIn(formData)
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
        <Button type="button" disabled={true}>
          <FaGoogle /> {t('loginWithGoogleButton')}
        </Button>
        <div className="flex justify-center items-center gap-2 text-nowrap text-muted-foreground before:flex before:border-t before:w-full after:flex after:border-t after:w-full">
          {t('continue')}
        </div>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="email">
            {t('email')}
          </Label>
          <Input id="email" {...register('email')} />
          {errors.email && <span className="mx-2 text-xs text-red-600">{errors.email.message}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="password">
            {t('password')}
          </Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <span className="mx-2 text-xs text-red-600">{errors.password.message}</span>}
        </fieldset>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button type="button" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : <LogIn />} {t('loginButton')}
        </Button>
        <Link className="text-center" href="/auth/sign-up">
          {t('noAccount')}
          <br />
          {t('signUp')}
        </Link>
      </CardFooter>
    </Card>
  )
}
