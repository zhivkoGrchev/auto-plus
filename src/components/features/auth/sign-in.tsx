'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import { FaCheck, FaSignInAlt, FaSpinner } from 'react-icons/fa'
import { ZodError } from 'zod'
import { useAuthContext } from './context'
import { signIn } from '@/lib/actions/auth.actions'
import { formSignInSchema } from '@/lib/validators/auth'
import type { SignInData } from '@/lib/types/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: SignInData = {
  email: '',
  password: '',
}

export const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const { fetchCurrentUser } = useAuthContext()
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
        const parsedData = formSignInSchema.parse(formData)
        const { data, error } = await signIn(parsedData)
        if (error) {
          console.log(error.message)
          return
        }
        fetchCurrentUser()
        setFormData(initialFormData)
        console.log(data)
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
    <div className="flex rounded-md border border-gray-800 dark:border-gray-600 bg-cyan-50 dark:bg-cyan-950">
      <div className="flex flex-col gap-4 p-8 justify-center border-r border-gray-800 dark:border-gray-600">
        {formErrors.form && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {formErrors.form.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
          {formErrors['email'] && <sub className="text-red-600">{formErrors['email'][0]}</sub>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input id="password" name="password" value={formData.password} onChange={handleInputChange} />
          {formErrors['password'] && <sub className="text-red-600">{formErrors['password'][0]}</sub>}
        </fieldset>
        <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} {t('loginButton')}
        </Button>
        <Link className="text-left" href="/auth/sign-up">
          {t('noAccount')}
          <br />
          {t('signUp')}
        </Link>
      </div>
      <FaSignInAlt className="w-70 h-auto m-8" />
    </div>
  )
}
