'use client'

import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaGoogle, FaSignInAlt, FaSpinner } from 'react-icons/fa'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { signIn } from '@/lib/actions/auth.actions'
import { useSession } from '@/lib/auth/client'
import { useSignInSchema } from '@/lib/validators/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { SignInData } from '@/lib/types/auth'

const initialFormData: SignInData = {
  email: '',
  password: '',
}

export const SignIn = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<SignInData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const { refetch } = useSession()
  const schema = useSignInSchema()
  const t = useTranslations('SignInPage')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    setFormErrors({})
    startTransitionSubmit(async () => {
      try {
        const parsedData = schema.parse(formData)
        const { data, error } = await signIn(parsedData)
        if (error) {
          toast(error.message)
          console.log(error.message)
          return
        }
        toast(data)
        setFormData(initialFormData)
        refetch()
        router.push('/admin')
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors: Record<string, string[]> = {}
          for (const err of error.errors) {
            const field = err.path.join('.') || 'form'
            if (!formattedErrors[field]) {
              formattedErrors[field] = []
            }
            formattedErrors[field].push(err.message)
          }
          setFormErrors(formattedErrors)
          console.log(formattedErrors)
        }
      }
    })
  }

  return (
    <Card className="min-w-md">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {formErrors.form && (
          <Alert variant="destructive">
            <AlertDescription>
              {formErrors.form.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </AlertDescription>
          </Alert>
        )}
        <Button type="button" onClick={handleSubmit} disabled={true}>
          <FaGoogle /> {t('loginWithGoogleButton')}
        </Button>
        <div className="flex justify-center items-center gap-2 text-nowrap text-muted-foreground before:flex before:border-t before:w-full after:flex after:border-t after:w-full">
          {t('continue')}
        </div>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="email">
            {t('email')}
          </Label>
          <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
          {formErrors['email'] && <sub className="mx-2 text-red-600">{formErrors['email'][0]}</sub>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="password">
            {t('password')}
          </Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
          {formErrors['password'] && <sub className="mx-2 text-red-600">{formErrors['password'][0]}</sub>}
        </fieldset>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaSignInAlt />} {t('loginButton')}
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
