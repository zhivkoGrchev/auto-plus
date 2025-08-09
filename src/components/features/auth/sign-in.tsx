'use client'

import Link from 'next/link'
import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import { FaCheck, FaSignInAlt, FaSpinner } from 'react-icons/fa'
import { ZodError } from 'zod'
import { Input } from '@/components/ui/input.custom'
import { useAuthContext } from './context'
import { signIn } from '@/lib/actions/auth.actions'
import { formSignInSchema } from '@/lib/validators/auth'
import type { SignInData } from '@/lib/types/auth'

const initialFormData: SignInData = {
  email: '',
  password: '',
}

export const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const { fetchCurrentUser } = useAuthContext()

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
        <fieldset className="flex flex-col">
          <div className="flex items-center gap-2">
            <label className="text-neutral-700 dark:text-neutral-300" htmlFor="email">
              E-Mail
            </label>
            <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          {formErrors['email'] && <p className="ml-26 mt-1 text-sm text-red-600">{formErrors['email'][0]}</p>}
        </fieldset>
        <fieldset className="flex flex-col">
          <div className="flex items-center gap-2">
            <label className="text-neutral-700 dark:text-neutral-300" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          {formErrors['password'] && <p className="ml-26 mt-1 text-sm text-red-600">{formErrors['password'][0]}</p>}
        </fieldset>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPendingSubmit}
          className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 dark:bg-cyan-900 hover:bg-cyan-400 dark:hover:bg-cyan-700 transition-colors outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-600 font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} Sign in
        </button>
        <Link className="text-left" href="/auth/sign-up">
          I have not account
        </Link>
      </div>
      <FaSignInAlt className="w-70 h-auto m-8" />
    </div>
  )
}
