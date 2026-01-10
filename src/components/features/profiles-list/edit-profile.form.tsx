import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editProfile } from '@/lib/actions/profile.actions'
import { type EditProfileData, useEditProfileSchema } from '@/lib/validators/profile'
import type { Profile } from '@/prisma/generated'

const initialFormData: EditProfileData = {
  slug: '',
  logo: '',
  company: '',
} as const

export interface EditProfileFormProps {
  profile: Profile
  onUpdate?: () => void
}

export const EditProfileForm = ({ profile, onUpdate }: EditProfileFormProps) => {
  const t = useTranslations('ProfileDialog')
  const schema = useEditProfileSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileData>({ defaultValues: initialFormData, resolver: zodResolver(schema) })

  const handleFormSubmit = async (formData: EditProfileData) => {
    if (!profile) {
      toast.error('Profile is not found')
      return
    }
    const { data, error } = await editProfile(formData, profile.id)
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
          <Label className="self-center" htmlFor="slug">
            {t('slug')}
          </Label>
          <Input id="slug" {...register('slug')} placeholder={profile.slug ? profile.slug : ''} />
          {errors.slug && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.slug.message}</span>}
          <Label className="self-center" htmlFor="logo">
            {t('logo')}
          </Label>
          <Input id="logo" {...register('logo')} placeholder={profile.logo ? profile.logo : ''} />
          {errors.logo && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.logo.message}</span>}
          <Label className="self-center" htmlFor="company">
            {t('company')}
          </Label>
          <Input id="company" {...register('company')} placeholder={profile.company ? profile.company : ''} />
          {errors.company && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{errors.company.message}</span>}
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
