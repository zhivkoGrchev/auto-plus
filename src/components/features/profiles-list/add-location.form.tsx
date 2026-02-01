import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { TableCell, TableRow } from '@/components/ui/table'
import { addLocation } from '@/lib/actions/profile.actions'
import { type AddLocationData, AddLocationSchema } from '@/lib/validators/location'

const INITIAL_FORM_DATA: AddLocationData = {
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postcode: '',
  isMain: false,
} as const

export interface AddLocationFormProps {
  profileId: string
  onUpdate?: () => void
}

export const AddLocationForm = ({ profileId, onUpdate }: AddLocationFormProps) => {
  const e = useTranslations('Validation.errors')
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddLocationData>({ defaultValues: INITIAL_FORM_DATA, resolver: zodResolver(AddLocationSchema) })

  const handleFormSubmit = async (formData: AddLocationData) => {
    const { data, error } = await addLocation(formData, profileId)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    reset()
    toast.success(data)
  }

  return (
    <TableRow>
      <TableCell>
        <Switch name="isMain" checked={watch('isMain')} onCheckedChange={(value) => setValue('isMain', value)} />
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('contactPerson')} />
        {errors.contactPerson?.message && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.contactPerson.message)}</span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('phone')} />
        {errors.phone?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.phone.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('email')} />
        {errors.email?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.email.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('address')} />
        {errors.address?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.address.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('city')} />
        {errors.city?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.city.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('postcode')} />
        {errors.postcode?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{e(errors.postcode.message)}</span>}
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        <Button className="w-full" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : <Check />} Save
        </Button>
      </TableCell>
    </TableRow>
  )
}
