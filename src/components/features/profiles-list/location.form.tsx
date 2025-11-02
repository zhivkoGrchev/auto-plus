import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import { Ban, Check, Loader } from 'lucide-react'
import { useCreateLocationSchema, useEditLocationSchema, type CreateLocationData, type EditLocationData } from '@/lib/validators/location'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Location } from '@prisma/client'

const initialFormData: EditLocationData = {
  employee: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postcode: '',
  isDefault: true,
} as const

export interface LocationFormProps {
  location?: Location
  onSubmit: (location: CreateLocationData | EditLocationData, show: boolean) => void
}

export const LocationForm = ({ location, onSubmit }: LocationFormProps) => {
  const [formData, setFormData] = useState<CreateLocationData | EditLocationData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = location ? useEditLocationSchema() : useCreateLocationSchema()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    startTransitionSubmit(async () => {
      setFormErrors({})
      const validation = schema.safeParse(formData)
      if (validation.success) {
        onSubmit(validation.data, false)
        return
      }
      const formattedErrors: Record<string, string[]> = {}
      for (const e of validation.error.errors) {
        const field = e.path.join('.') || 'form'
        if (!formattedErrors[field]) {
          formattedErrors[field] = []
        }
        formattedErrors[field].push(e.message)
      }
      setFormErrors(formattedErrors)
    })
  }

  return (
    <TableRow>
      <TableCell>&nbsp;</TableCell>
      <TableCell>
        <Input className="w-full" name="employee" value={formData.employee} onChange={handleInputChange} />
        {formErrors.employee && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.employee[0]}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" name="phone" value={formData.phone} onChange={handleInputChange} />
        {formErrors.phone && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.phone[0]}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" name="email" value={formData.email} onChange={handleInputChange} />
        {formErrors.email && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.email[0]}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" name="address" value={formData.address} onChange={handleInputChange} />
        {formErrors.address && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.address[0]}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" name="city" value={formData.city} onChange={handleInputChange} />
        {formErrors.city && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.city[0]}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" name="postcode" value={formData.postcode} onChange={handleInputChange} />
        {formErrors.postcode && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors.postcode[0]}
          </span>
        )}
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        <Button onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <Loader className="animate-spin" /> : <Check />} Save
        </Button>
      </TableCell>
    </TableRow>
  )
}
