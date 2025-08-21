import { ChangeEvent, MouseEvent, useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { EditUserData, UserWithProfiles } from '@/lib/types/user'
import { FaCheck, FaSpinner } from 'react-icons/fa'

const initialFormData: EditUserData = {
  name: '',
  email: '',
  password: '',
} as const

export interface EditUserDialogProps {
  user?: UserWithProfiles
}

export const EditUserDialog = ({ user }: EditUserDialogProps) => {
  const [formData, setFormData] = useState<EditUserData>(initialFormData)
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
    startTransitionSubmit(async () => {})
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!user}>Edit user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>You can edit your user</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <Label className="self-center" htmlFor="name">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
          <Label className="self-center" htmlFor="email">
            E-Mail
          </Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          <Label className="self-center" htmlFor="password">
            Password
          </Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
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
