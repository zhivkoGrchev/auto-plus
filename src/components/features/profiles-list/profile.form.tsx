import { ChangeEvent, MouseEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Ban, Check, Loader } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { type ProfileData, useProfileSchema } from '@/lib/validators/profile'
import type { Profile } from '@prisma/client'

const initialFormData: ProfileData = {
  slug: '',
  address: '',
  phoneNumber: '',
} as const

export interface ProfileFormProps {
  profile?: Profile
  onSubmit: (profile: ProfileData, profileId?: string) => void
}

export const ProfileForm = ({ profile, onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = useProfileSchema(!!profile)
  const t = useTranslations('ProfileDialog')

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
        onSubmit(validation.data, profile?.id)
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
    <div className="flex flex-col gap-4">
      {formErrors.form && (
        <Alert variant="destructive">
          <AlertDescription>
            {formErrors.form.map((error, index) => (
              <p key={index}>
                <Ban />
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <Label className="self-center" htmlFor="slug">
          {t('slug')}
        </Label>
        <Input id="slug" name="slug" placeholder={profile?.slug} value={formData.slug} onChange={handleInputChange} />
        {formErrors['slug'] && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors['slug'][0]}
          </span>
        )}
        <Label className="self-center" htmlFor="address">
          {t('address')}
        </Label>
        <Input id="address" name="address" placeholder={profile?.address} value={formData.address} onChange={handleInputChange} />
        {formErrors['address'] && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors['address'][0]}
          </span>
        )}
        <Label className="self-center" htmlFor="phoneNumber">
          {t('phoneNumber')}
        </Label>
        <Input id="phoneNumber" name="phoneNumber" placeholder={profile?.phoneNumber} value={formData.phoneNumber} onChange={handleInputChange} />
        {formErrors['phoneNumber'] && (
          <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
            <Ban size="1em" />
            {formErrors['phoneNumber'][0]}
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isPendingSubmit}>
          {isPendingSubmit ? <Loader className="animate-spin" /> : <Check />} {t('save')}
        </Button>
      </div>
    </div>
  )
}
