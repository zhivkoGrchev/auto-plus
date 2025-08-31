import { ChangeEvent, MouseEvent, useState, useTransition } from 'react'
import { FaCheck, FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth/client'
import { useChangePasswordSchema, type ChangePasswordData } from '@/lib/validators/profile'

const initialData: ChangePasswordData = {
  currentPassword: '',
  newPassword: '',
}

export interface PasswordDialogProps {
  onUpdate?: () => void
}

export const PasswordDialog = ({ onUpdate }: PasswordDialogProps) => {
  const [isOpen, setOpen] = useState(false)
  const [formData, setFormData] = useState<ChangePasswordData>(initialData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = useChangePasswordSchema()

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
      const validation = schema.safeParse(formData)
      if (validation.success) {
        const { error } = await authClient.changePassword({
          currentPassword: validation.data.currentPassword,
          newPassword: validation.data.newPassword,
          revokeOtherSessions: true,
        })
        if (error) {
          toast.error(error.message)
          return
        }
        if (onUpdate) {
          onUpdate()
        }
        toast.success('The password has been successfully changed')
        setOpen(false)
      } else {
        const formattedErrors: Record<string, string[]> = {}
        for (const e of validation.error.errors) {
          const field = e.path.join('.') || 'form'
          if (!formattedErrors[field]) {
            formattedErrors[field] = []
          }
          formattedErrors[field].push(e.message)
        }
        setFormErrors(formattedErrors)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Change password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>Fill in the following fields to change your password</DialogDescription>
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
            <Label className="self-center" htmlFor="currentPassword">
              Current password
            </Label>
            <Input id="currentPassword" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleInputChange} />
            {formErrors['currentPassword'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['currentPassword'][0]}</span>}
            <Label className="self-center" htmlFor="newPassword">
              New password
            </Label>
            <Input id="newPassword" name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} />
            {formErrors['newPassword'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['newPassword'][0]}</span>}
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
