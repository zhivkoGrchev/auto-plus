import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader, MapPinMinus, MapPinPen, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { TableCell, TableRow } from '@/components/ui/table'
import { deleteLocation, editLocation } from '@/lib/actions/profile.actions'
import { getChangedFields } from '@/lib/utils'
import { type EditLocationData, EditLocationSchema } from '@/lib/validators/location'
import type { Location } from '@/prisma/generated'

export interface EditLocationFormProps {
  location: Location
  onUpdate?: () => void
}

export const EditLocationForm = ({ location, onUpdate }: EditLocationFormProps) => {
  const m = useTranslations('Validations')
  const [isEditing, setEditing] = useState(false)
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditLocationData>({
    defaultValues: {
      contactPerson: location.contactPerson,
      phone: location.phone,
      email: location.email,
      address: location.address,
      city: location.city,
      postcode: location.postcode,
      isMain: location.isMain,
    },
    resolver: zodResolver(EditLocationSchema),
  })

  const handleFormSubmit = async (formData: EditLocationData) => {
    const changedData = getChangedFields<EditLocationData>(location, formData)
    const { data, error } = await editLocation(changedData, location.id)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    toast.success(data)
  }

  const handleDeleteLocation = async (id: string) => {
    const { data, error } = await deleteLocation(id)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    toast.success(data)
  }

  return isEditing ? (
    <TableRow>
      <TableCell>
        <Switch name="isMain" checked={watch('isMain')} onCheckedChange={(value) => setValue('isMain', value)} />
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('contactPerson')} placeholder={location.contactPerson} />
        {errors.contactPerson?.message && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.contactPerson.message)}</span>
        )}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('phone')} />
        {errors.phone?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.phone.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('email')} />
        {errors.email?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.email.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('address')} />
        {errors.address?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.address.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('city')} />
        {errors.city?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.city.message)}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('postcode')} />
        {errors.postcode?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.postcode.message)}</span>}
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        <Button onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : <Check />} Save
        </Button>
        <Button variant="destructive" onClick={() => setEditing(false)}>
          <X />
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell>
        <Switch checked={location.isMain} />
      </TableCell>
      <TableCell>{location.contactPerson}</TableCell>
      <TableCell>{location.phone}</TableCell>
      <TableCell>{location.email}</TableCell>
      <TableCell>{location.address}</TableCell>
      <TableCell>{location.city}</TableCell>
      <TableCell>{location.postcode}</TableCell>
      <TableCell className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setEditing(true)}>
          <MapPinPen />
        </Button>
        <Button variant="destructive" onClick={() => handleDeleteLocation(location.id)}>
          <MapPinMinus />
        </Button>
      </TableCell>
    </TableRow>
  )
}
