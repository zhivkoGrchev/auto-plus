'use client'

import Link from 'next/link'
import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import { FaCheck, FaSpinner, FaUserPlus } from 'react-icons/fa'
import { ZodError } from 'zod'
import { signUp } from '@/lib/actions/auth.actions'
import { formSignUpSchema } from '@/lib/validators/auth'
import type { SignUpData } from '@/lib/types/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const initialFormData: SignUpData = {
  name: '',
  email: '',
  password: '',
}

export const SignUp = () => {
  const [formData, setFormData] = useState<SignUpData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()

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
        const parsedData = formSignUpSchema.parse(formData)
        const { data, error } = await signUp(parsedData)
        if (error) {
          console.log(error.message)
          return
        }
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
          <Label className="mx-2" htmlFor="name">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
          {formErrors['name'] && <sub className="mx-2 text-red-600">{formErrors['name'][0]}</sub>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="email">
            E-Mail
          </Label>
          <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
          {formErrors['email'] && <sub className=" mx-2 text-red-600">{formErrors['email'][0]}</sub>}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <Label className="mx-2" htmlFor="password">
            Password
          </Label>
          <Input id="password" name="password" value={formData.password} onChange={handleInputChange} />
          {formErrors['password'] && <sub className="mx-2 text-red-600">{formErrors['password'][0]}</sub>}
        </fieldset>
        <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} Sign up
        </Button>
        <Link className="text-left" href="/auth/sign-in">
          I have an account
        </Link>
      </div>
      <FaUserPlus className="w-70 h-auto m-8" />
    </div>
  )
}
