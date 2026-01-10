import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader, MapPinMinus, MapPinPen, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { TableCell, TableRow } from '@/components/ui/table'
import { deleteLocation, editLocation } from '@/lib/actions/profile.actions'
import { type EditLocationData, useEditLocationSchema } from '@/lib/validators/location'
import type { Location } from '@/prisma/generated'

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
  const [isEditing, setEditing] = useState(false)
  const schema = useEditLocationSchema()
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditLocationData>({ defaultValues: { ...initialFormData, isDefault: location.isDefault }, resolver: zodResolver(schema) }) //TODO solve the typing problem

  const handleFormSubmit = async (formData: EditLocationData) => {
    const { data, error } = await editLocation(formData, location.id)
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
        <Switch name="isDefault" checked={watch('isDefault')} onCheckedChange={(value) => setValue('isDefault', value)} />
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('contactPerson')} placeholder={location.contactPerson} />
        {errors.contactPerson && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.contactPerson.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('phone')} placeholder={location.phone} />
        {errors.phone && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.phone.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('email')} placeholder={location.email} />
        {errors.email && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.email.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('address')} placeholder={location.address} />
        {errors.address && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.address.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('city')} placeholder={location.city} />
        {errors.city && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.city.message}</span>}
      </TableCell>
      <TableCell>
        <Input className="w-full" {...register('postcode')} placeholder={location.postcode} />
        {errors.postcode && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.postcode.message}</span>}
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
    <TableRow key={location.id}>
      <TableCell>
        <Switch checked={location.isDefault} />
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
