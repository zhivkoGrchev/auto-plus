import { ChangeEvent, MouseEvent, ReactNode, useState, useTransition } from 'react'
import { ZodError } from 'zod'
import { FaCheck, FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createProfile, editProfile } from '@/lib/actions/profile.actions'
import { type EditProfileData, useCreateProfileSchema, useEditProfileSchema } from '@/lib/validators/profile'
import type { Profile } from '@prisma/client'

const initialFormData: EditProfileData = {
  organization: '',
  address: '',
  phoneNumber: '',
} as const

export interface ProfileDialogProps {
  trigger?: ReactNode
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ trigger, profile, onUpdate }: ProfileDialogProps) => {
  const [isOpen, setOpen] = useState(false)
  const [formData, setFormData] = useState<EditProfileData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const createSchema = useCreateProfileSchema()
  const editSchema = useEditProfileSchema()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    const actionProfile = async () => {
      if (!profile) {
        const validData = createSchema.parse(formData)
        return await createProfile(validData)
      } else {
        const validData = editSchema.parse(formData)
        return await editProfile(validData, profile.id)
      }
    }

    startTransitionSubmit(async () => {
      try {
        const { data, error } = await actionProfile()
        if (error) {
          toast.error(error.message)
          return
        }
        if (onUpdate) {
          onUpdate()
        }
        toast.success(data)
        setOpen(false)
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors: Record<string, string[]> = {}
          for (const e of error.errors) {
            const field = e.path.join('.') || 'form'
            if (!formattedErrors[field]) {
              formattedErrors[field] = []
            }
            formattedErrors[field].push(e.message)
          }
          setFormErrors(formattedErrors)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ? trigger : <Button>{!profile ? 'Create profile' : 'Edit profile'}</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!profile ? 'Create new profile' : 'Edit profile'}</DialogTitle>
          <DialogDescription>{!profile ? 'Fill in all the fields' : 'Fill in the fields that you want to change'}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {formErrors.form && (
            <Alert variant="destructive">
              <AlertDescription>
                {formErrors.form.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <Label className="self-center" htmlFor="organization">
              Organization
            </Label>
            <Input id="organization" name="organization" placeholder={profile?.organization} value={formData.organization} onChange={handleInputChange} />
            {formErrors['organization'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['organization'][0]}</span>}
            <Label className="self-center" htmlFor="address">
              Address
            </Label>
            <Input id="address" name="address" placeholder={profile?.address} value={formData.address} onChange={handleInputChange} />
            {formErrors['address'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['address'][0]}</span>}
            <Label className="self-center" htmlFor="phoneNumber">
              Phone number
            </Label>
            <Input id="phoneNumber" name="phoneNumber" placeholder={profile?.phoneNumber} value={formData.phoneNumber} onChange={handleInputChange} />
            {formErrors['phoneNumber'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['phoneNumber'][0]}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPendingSubmit}>
            {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
