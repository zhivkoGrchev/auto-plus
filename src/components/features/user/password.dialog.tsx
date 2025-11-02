import { type ChangeEvent, type ComponentProps, type MouseEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Check, Loader } from 'lucide-react'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth/client'
import { useChangePasswordSchema, type ChangePasswordData } from '@/lib/validators/user'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: ChangePasswordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export interface PasswordDialogProps extends ComponentProps<typeof Dialog> {
  onUpdate?: () => void
}

export const PasswordDialog = ({ open, onOpenChange, onUpdate }: PasswordDialogProps) => {
  const [formData, setFormData] = useState<ChangePasswordData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = useChangePasswordSchema()
  const t = useTranslations('ChangePasswordDialog')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    setFormErrors({})
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
        onUpdate?.()
        onOpenChange?.(false)
        setFormData(initialFormData)
        toast.success(t('success'))
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
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
              {t('currentPassword')}
            </Label>
            <Input id="currentPassword" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleInputChange} />
            {formErrors.currentPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors.currentPassword[0]}</span>}
            <Label className="self-center" htmlFor="newPassword">
              {t('newPassword')}
            </Label>
            <Input id="newPassword" name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} />
            {formErrors.newPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors.newPassword[0]}</span>}
            <Label className="self-center" htmlFor="confirmPassword">
              {t('confirmPassword')}
            </Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
            {formErrors.confirmPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors.confirmPassword[0]}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPendingSubmit}>
            {isPendingSubmit ? <Loader className="animate-spin" /> : <Check />} {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
