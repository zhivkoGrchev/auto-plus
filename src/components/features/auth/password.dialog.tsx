import type { ComponentProps } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Check, Loader } from 'lucide-react'
import { authClient } from '@/lib/auth/client'
import { useChangePasswordSchema, type ChangePasswordData } from '@/lib/validators/auth'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: ChangePasswordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
} as const

export interface PasswordDialogProps extends ComponentProps<typeof Dialog> {
  onUpdate?: () => void
}

export const PasswordDialog = ({ open, onOpenChange, onUpdate }: PasswordDialogProps) => {
  const t = useTranslations('PasswordDialog')
  const schema = useChangePasswordSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({ defaultValues: initialFormData, resolver: zodResolver(schema) })

  const handleFormSubmit = async (formData: ChangePasswordData) => {
    const { error } = await authClient.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      revokeOtherSessions: true,
    })
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    onOpenChange?.(false)
    toast.success(t('success'))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <Label className="self-center" htmlFor="currentPassword">
                {t('currentPassword')}
              </Label>
              <Input id="currentPassword" type="password" {...register('currentPassword')} />
              {errors.currentPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{errors.currentPassword.message}</span>}
              <Label className="self-center" htmlFor="newPassword">
                {t('newPassword')}
              </Label>
              <Input id="newPassword" type="password" {...register('newPassword')} />
              {errors.newPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{errors.newPassword.message}</span>}
              <Label className="self-center" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <span className="col-start-2 mx-2 text-xs text-red-600">{errors.confirmPassword.message}</span>}
            </div>
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
