import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Check, Loader } from 'lucide-react'
import { createProfileWithLocation } from '@/lib/actions/profile.actions'
import { type CreateProfileWithLocationData, useCreateProfileWithLocationSchema } from '@/lib/validators/profile'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const initialFormData: CreateProfileWithLocationData = {
  slug: '',
  logo: '',
  company: '',
  location: {
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    isDefault: true,
  },
} as const

export interface CreateProfileFormProps {
  onUpdate?: () => void
}

export const CreateProfileForm = ({ onUpdate }: CreateProfileFormProps) => {
  const t = useTranslations('ProfileDialog')
  const schema = useCreateProfileWithLocationSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProfileWithLocationData>({
    defaultValues: initialFormData,
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (formData: CreateProfileWithLocationData) => {
    const { data, error } = await createProfileWithLocation(formData)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    toast.success(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <h3 className="col-start-2 m-2 p-2 flex justify-center border-b text-lg">Profile</h3>
          <Label className="self-center" htmlFor="slug">
            {t('slug')}
          </Label>
          <Input id="slug" {...register('slug')} />
          {errors.slug && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.slug.message}</span>}
          <Label className="self-center" htmlFor="logo">
            {t('logo')}
          </Label>
          <Input id="logo" {...register('logo')} />
          {errors.logo && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.logo.message}</span>}
          <Label className="self-center" htmlFor="company">
            {t('company')}
          </Label>
          <Input id="company" {...register('company')} />
          {errors.company && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.company.message}</span>}
          <h3 className="col-start-2 m-2 p-2 flex justify-center border-b text-lg">Contact Person</h3>
          <Label className="self-center" htmlFor="contactPerson">
            {t('location.contactPerson')}
          </Label>
          <Input id="contactPerson" {...register('location.contactPerson')} />
          {errors.location?.contactPerson && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.contactPerson.message}</span>
          )}
          <Label className="self-center" htmlFor="phone">
            {t('location.phone')}
          </Label>
          <Input id="phone" {...register('location.phone')} />
          {errors.location?.phone && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.phone.message}</span>}
          <Label className="self-center" htmlFor="email">
            {t('location.email')}
          </Label>
          <Input id="email" {...register('location.email')} />
          {errors.location?.email && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.email.message}</span>}
          <h3 className="col-start-2 m-2 p-2 flex justify-center border-b text-lg">Location</h3>
          <Label className="self-center" htmlFor="address">
            {t('location.address')}
          </Label>
          <Input id="address" {...register('location.address')} />
          {errors.location?.address && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.address.message}</span>}
          <Label className="self-center" htmlFor="city">
            {t('location.city')}
          </Label>
          <Input id="city" {...register('location.city')} />
          {errors.location?.city && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.city.message}</span>}
          <Label className="self-center" htmlFor="postcode">
            {t('location.postcode')}
          </Label>
          <Input id="postcode" {...register('location.postcode')} />
          {errors.location?.postcode && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.location.postcode.message}</span>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : <Check />} {t('save')}
          </Button>
        </div>
      </div>
    </form>
  )
}
