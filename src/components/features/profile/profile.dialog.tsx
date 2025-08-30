import { ChangeEvent, MouseEvent, useState, useTransition } from 'react'
import { FaCheck, FaSpinner } from 'react-icons/fa'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createProfile } from '@/lib/actions/profile.actions'
import type { UserWithProfiles, EditProfileData } from '@/lib/types/profile'

const initialFormData: EditProfileData = {
  organization: '',
  address: '',
  phoneNumber: '',
} as const

export interface ProfileDialogProps {
  user?: UserWithProfiles
}

export const ProfileDialog = ({ user }: ProfileDialogProps) => {
  const [formData, setFormData] = useState<EditProfileData>(initialFormData)
  const [isPendingSubmit, startTransitionSubmit] = useTransition()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    startTransitionSubmit(async () => {
      createProfile({ organization: formData.organization, address: formData.address, phoneNumber: formData.phoneNumber })
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!user}>Add profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new profile</DialogTitle>
          <DialogDescription>You can add a new profile</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <Label className="self-center" htmlFor="organization">
            Organization
          </Label>
          <Input id="organization" name="organization" value={formData.organization} onChange={handleInputChange} />
          <Label className="self-center" htmlFor="address">
            Address
          </Label>
          <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
          <Label className="self-center" htmlFor="phoneNumber">
            Phone number
          </Label>
          <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
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
