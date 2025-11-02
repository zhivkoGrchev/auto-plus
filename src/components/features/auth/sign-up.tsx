'use client'

import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ZodError } from 'zod'
import { Loader, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { signUp } from '@/lib/actions/auth.actions'
import { useSession } from '@/lib/auth/client'
import { useSignUpSchema, type SignUpData } from '@/lib/validators/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const initialFormData: SignUpData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<SignUpData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const { refetch } = useSession()
  const schema = useSignUpSchema()
  const t = useTranslations('SignUpPage')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    setFormErrors({})
    startTransitionSubmit(async () => {
      try {
        const parsedData = schema.parse(formData)
        const { data, error } = await signUp(parsedData)
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
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="name">
            {t('name')}
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
          {formErrors.name && <span className="mx-2 text-xs text-red-600">{formErrors.name[0]}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="email">
            {t('email')}
          </Label>
          <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
          {formErrors.email && <span className=" mx-2 text-xs text-red-600">{formErrors.email[0]}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="password">
            {t('password')}
          </Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
          {formErrors.password && <span className="mx-2 text-xs text-red-600">{formErrors.password[0]}</span>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="confirmPassword">
            {t('confirmPassword')}
          </Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
          {formErrors.confirmPassword && <span className="mx-2 text-xs text-red-600">{formErrors.confirmPassword[0]}</span>}
        </fieldset>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <Loader className="animate-spin" /> : <UserPlus />} {t('signUpButton')}
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
