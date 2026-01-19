import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ComponentProps, useEffect, useState } from 'react'
import { type FieldErrors, type UseFormRegister, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/actions/pinata.actions'
import { addProfileWithLocation, editProfile } from '@/lib/actions/profile.actions'
import type { ImageFile } from '@/lib/types/image'
import { getChangedFields } from '@/lib/utils'
import { type AddProfileWithLocationData, AddProfileWithLocationSchema, type EditProfileData, EditProfileSchema } from '@/lib/validators/profile'
import type { Profile } from '@/prisma/generated'
import { LogoManager } from './logo-manager'

const INITIAL_FORM_DATA: AddProfileWithLocationData = {
  slug: '',
  company: '',
  imageUrl: '',
  imageCid: null,
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

const INITIAL_LOGO_DATA: ImageFile = {
  imageUrl: '',
  imageCid: null,
  imageFile: null,
} as const

export interface ProfileDialogProps extends ComponentProps<typeof Dialog> {
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ open, profile, onOpenChange, onUpdate }: ProfileDialogProps) => {
  const isAdd = !profile
  const schema = isAdd ? AddProfileWithLocationSchema : EditProfileSchema
  const initialFormData = isAdd ? INITIAL_FORM_DATA : { slug: profile.slug, company: profile.company, imageUrl: profile.imageUrl, imageCid: profile.imageCid }
  const initialLogoData = isAdd ? INITIAL_LOGO_DATA : { imageUrl: profile.imageUrl, imageCid: profile.imageCid, imageFile: null }

  const t = useTranslations('ProfileDialog')
  const m = useTranslations('Validations')
  const [logo, setLogo] = useState<ImageFile>(initialLogoData)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProfileWithLocationData | EditProfileData>({
    defaultValues: initialFormData,
    resolver: zodResolver(schema),
  })
  const errorsWithLocation = errors as FieldErrors<AddProfileWithLocationData>
  const registerWithLocation = register as UseFormRegister<AddProfileWithLocationData>

  useEffect(() => {
    if (open) {
      reset(initialFormData)
      setLogo(initialLogoData)
    }
  }, [open, profile, reset])

  useEffect(() => {
    return () => {
      if (logo.imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(logo.imageUrl)
      }
    }
  }, [logo.imageUrl])

  const handleAddLogo = (file: File) => setLogo({ imageUrl: URL.createObjectURL(file), imageCid: null, imageFile: file })

  const handleDeleteLogo = () => setLogo(INITIAL_LOGO_DATA)

  const handleFormSubmit = async (formData: AddProfileWithLocationData | EditProfileData) => {
    const finalFormData = isAdd ? { ...formData } : getChangedFields<EditProfileData>(profile, formData)
    if (logo.imageFile) {
      const { data, error } = await uploadImage(logo.imageFile)
      if (error) {
        toast.error(error.message)
        return
      }
      finalFormData.imageUrl = data.imageUrl
      finalFormData.imageCid = data.imageCid
      setLogo({ imageUrl: data.imageUrl, imageCid: data.imageCid, imageFile: null })
    } else if (!logo.imageUrl && !logo.imageCid) {
      finalFormData.imageUrl = logo.imageUrl
      finalFormData.imageCid = logo.imageCid
    }
    const { data, error } = !profile
      ? await addProfileWithLocation(finalFormData as AddProfileWithLocationData)
      : await editProfile(finalFormData as EditProfileData, profile.id)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success(data)
    reset(INITIAL_FORM_DATA)
    setLogo(INITIAL_LOGO_DATA)
    onUpdate?.()
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(isAdd ? 'add.title' : 'edit.title')}</DialogTitle>
          <DialogDescription>{t(isAdd ? 'add.description' : 'edit.description')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="grow grid grid-cols-[auto_1fr] gap-2">
                <Label className="self-center" htmlFor="company">
                  {t('company')}
                </Label>
                <Input id="company" {...register('company')} />
                <Label className="self-center" htmlFor="slug">
                  {t('slug')}
                </Label>
                <Input id="slug" {...register('slug')} />
                {errors.slug?.message && <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errors.slug.message)}</span>}
              </div>
              <LogoManager logo={logo} onAddLogo={handleAddLogo} onDeleteLogo={handleDeleteLogo} />
            </div>
            {isAdd && (
              <>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <h3 className="col-start-2 mx-2 flex justify-center border-b text-lg">Location</h3>
                  <Label className="self-center" htmlFor="address">
                    {t('location.address')}
                  </Label>
                  <Input id="address" {...registerWithLocation('location.address')} />
                  {errorsWithLocation.location?.address?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errorsWithLocation.location.address.message)}</span>
                  )}
                  <Label className="self-center" htmlFor="city">
                    {t('location.city')}
                  </Label>
                  <Input id="city" {...registerWithLocation('location.city')} />
                  {errorsWithLocation.location?.city?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errorsWithLocation.location.city.message)}</span>
                  )}
                  <Label className="self-center" htmlFor="postcode">
                    {t('location.postcode')}
                  </Label>
                  <Input id="postcode" {...registerWithLocation('location.postcode')} />
                  {errorsWithLocation.location?.postcode?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errorsWithLocation.location.postcode.message)}</span>
                  )}
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <h3 className="col-start-2 mx-2 flex justify-center border-b text-lg">Contact Person</h3>
                  <Label className="self-center" htmlFor="contactPerson">
                    {t('location.contactPerson')}
                  </Label>
                  <Input id="contactPerson" {...registerWithLocation('location.contactPerson')} />
                  {errorsWithLocation.location?.contactPerson?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">
                      {m(errorsWithLocation.location.contactPerson.message)}
                    </span>
                  )}
                  <Label className="self-center" htmlFor="phone">
                    {t('location.phone')}
                  </Label>
                  <Input id="phone" {...registerWithLocation('location.phone')} />
                  {errorsWithLocation.location?.phone?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errorsWithLocation.location.phone.message)}</span>
                  )}
                  <Label className="self-center" htmlFor="email">
                    {t('location.email')}
                  </Label>
                  <Input id="email" {...registerWithLocation('location.email')} />
                  {errorsWithLocation.location?.email?.message && (
                    <span className="col-start-2 mx-2 flex items-center gap-2 text-xs text-red-600">{m(errorsWithLocation.location.email.message)}</span>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader className="animate-spin" /> : <Check />} {t('save')}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
