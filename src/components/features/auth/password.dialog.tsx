import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth/client'
import { type ChangePasswordData, ChangePasswordSchema } from '@/lib/validators/auth'

const INITIAL_FORM_DATA: ChangePasswordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
} as const

export interface PasswordDialogProps extends ComponentProps<typeof Dialog> {
  onUpdate?: () => void | Promise<void>
}

export const PasswordDialog = ({ open, onOpenChange, onUpdate }: PasswordDialogProps) => {
  const t = useTranslations('PasswordDialog')
  const e = useTranslations('Validation.errors')
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({ defaultValues: INITIAL_FORM_DATA, resolver: zodResolver(ChangePasswordSchema) })

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
    reset(INITIAL_FORM_DATA)
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
              {errors.currentPassword?.message && <span className="col-start-2 mx-2 text-xs text-red-600">{e(errors.currentPassword.message)}</span>}
              <Label className="self-center" htmlFor="newPassword">
                {t('newPassword')}
              </Label>
              <Input id="newPassword" type="password" {...register('newPassword')} />
              {errors.newPassword?.message && <span className="col-start-2 mx-2 text-xs text-red-600">{e(errors.newPassword.message)}</span>}
              <Label className="self-center" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword?.message && <span className="col-start-2 mx-2 text-xs text-red-600">{e(errors.confirmPassword.message)}</span>}
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
