import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma-client'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getChangedFields } from '@/lib/utils'
import { type EditUserData, EditUserSchema } from '@/lib/validators/auth'
import { editUser } from '@/server/actions/auth.actions'

export interface UserDialogProps extends ComponentProps<typeof Dialog> {
  user: User
  onUpdate?: () => void
}

export const UserDialog = ({ open, user, onOpenChange, onUpdate }: UserDialogProps) => {
  const initialFormData: EditUserData = { name: user.name, email: user.email }
  const t = useTranslations('UserDialog')
  const e = useTranslations('Validation.errors')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserData>({ defaultValues: initialFormData, resolver: zodResolver(EditUserSchema) })

  const handleFormSubmit = async (formData: EditUserData) => {
    const finalFormData = getChangedFields<EditUserData>(initialFormData, formData)
    const { data, error } = await editUser(finalFormData)
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    onOpenChange?.(false)
    toast.success(data)
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
              <Label className="self-center" htmlFor="name">
                {t('name')}
              </Label>
              <Input id="name" {...register('name')} />
              <Label className="self-center" htmlFor="email">
                {t('email')}
              </Label>
              <Input id="email" {...register('email')} />
              {errors.email?.message && <span className="col-start-2 mx-2 text-xs text-red-600">{e(errors.email.message)}</span>}
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
