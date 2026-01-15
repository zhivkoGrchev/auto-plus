import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addProfileWithLocation } from '@/lib/actions/profile.actions'
import { type AddProfileWithLocationData, AddProfileWithLocationSchema } from '@/lib/validators/profile'

const INITIAL_FORM_DATA: AddProfileWithLocationData = {
  slug: '',
  company: '',
  logoUrl: '',
  logoHash: '',
  location: {
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    isMain: true,
  },
} as const

export interface AddProfileFormProps {
  onUpdate?: () => void
}

export const AddProfileForm = ({ onUpdate }: AddProfileFormProps) => {
  const t = useTranslations('ProfileDialog')
  const m = useTranslations('Validations')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProfileWithLocationData>({
    defaultValues: INITIAL_FORM_DATA,
    resolver: zodResolver(AddProfileWithLocationSchema),
  })

  const handleFormSubmit = async (formData: AddProfileWithLocationData) => {
    const { data, error } = await addProfileWithLocation(formData)
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
          {errors.slug?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.slug.message)}</span>}
          <Label className="self-center" htmlFor="logoUrl">
            {t('logo')}
          </Label>
          <Input id="logoUrl" {...register('logoUrl')} />
          <Label className="self-center" htmlFor="company">
            {t('company')}
          </Label>
          <Input id="company" {...register('company')} />
          <h3 className="col-start-2 m-2 p-2 flex justify-center border-b text-lg">Location</h3>
          <Label className="self-center" htmlFor="address">
            {t('location.address')}
          </Label>
          <Input id="address" {...register('location.address')} />
          {errors.location?.address?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.address.message)}</span>
          )}
          <Label className="self-center" htmlFor="city">
            {t('location.city')}
          </Label>
          <Input id="city" {...register('location.city')} />
          {errors.location?.city?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.city.message)}</span>
          )}
          <Label className="self-center" htmlFor="postcode">
            {t('location.postcode')}
          </Label>
          <Input id="postcode" {...register('location.postcode')} />
          {errors.location?.postcode?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.postcode.message)}</span>
          )}
          <h3 className="col-start-2 m-2 p-2 flex justify-center border-b text-lg">Contact Person</h3>
          <Label className="self-center" htmlFor="contactPerson">
            {t('location.contactPerson')}
          </Label>
          <Input id="contactPerson" {...register('location.contactPerson')} />
          {errors.location?.contactPerson?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.contactPerson.message)}</span>
          )}
          <Label className="self-center" htmlFor="phone">
            {t('location.phone')}
          </Label>
          <Input id="phone" {...register('location.phone')} />
          {errors.location?.phone?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.phone.message)}</span>
          )}
          <Label className="self-center" htmlFor="email">
            {t('location.email')}
          </Label>
          <Input id="email" {...register('location.email')} />
          {errors.location?.email?.message && (
            <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.location.email.message)}</span>
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
