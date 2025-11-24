import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Check, Loader } from 'lucide-react'
import { editLocation } from '@/lib/actions/profile.actions'
import { type EditLocationData, useEditLocationSchema } from '@/lib/validators/location'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Location } from '@prisma/client'

const initialFormData: EditLocationData = {
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postcode: '',
  isDefault: false,
} as const

export interface EditLocationFormProps {
  location: Location
  onUpdate?: () => void
}

export const EditLocationForm = ({ location, onUpdate }: EditLocationFormProps) => {
  const schema = useEditLocationSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditLocationData>({ defaultValues: initialFormData, resolver: zodResolver(schema) })

  const handleFormSubmit = async (formData: EditLocationData) => {
    const { data, error } = await editLocation(formData)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    toast.success(data)
  }

  return (
    <TableRow>
      <TableCell>&nbsp;</TableCell>
      <TableCell>
        <Input className="w-full" {...register('contactPerson')} />
        {errors.contactPerson && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.contactPerson.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('phone')} />
        {errors.phone && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.phone.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('email')} />
        {errors.email && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.email.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('address')} />
        {errors.address && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.address.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('city')} />
        {errors.city && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.city.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('postcode')} />
        {errors.postcode && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.postcode.message}</span>}
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        <Button onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : <Check />} Save
        </Button>
      </TableCell>
    </TableRow>
  )
}
