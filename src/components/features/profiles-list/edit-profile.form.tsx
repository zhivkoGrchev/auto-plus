import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editProfile } from '@/lib/actions/profile.actions'
import { getChangedFields } from '@/lib/utils'
import { type EditProfileData, EditProfileSchema } from '@/lib/validators/profile'
import type { Profile } from '@/prisma/generated'

export interface EditProfileFormProps {
  profile: Profile
  onUpdate?: () => void
}

export const EditProfileForm = ({ profile, onUpdate }: EditProfileFormProps) => {
  const t = useTranslations('ProfileDialog')
  const m = useTranslations('Validations')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileData>({
    defaultValues: {
      slug: profile.slug,
      company: profile.company,
      logoUrl: profile.logoUrl,
      logoHash: profile.logoHash,
    },
    resolver: zodResolver(EditProfileSchema),
  })

  const handleFormSubmit = async (formData: EditProfileData) => {
    const changedData = getChangedFields<EditProfileData>(profile, formData)
    const { data, error } = await editProfile(changedData, profile.id)
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
          {errors.slug?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.slug.message)}</span>}
          <Label className="self-center" htmlFor="logoUrl">
            {t('logo')}
          </Label>
          <Input id="logoUrl" {...register('logoUrl')} placeholder={profile.logoUrl ? profile.logoUrl : ''} />
          <Label className="self-center" htmlFor="company">
            {t('company')}
          </Label>
          <Input id="company" {...register('company')} placeholder={profile.company ? profile.company : ''} />
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
