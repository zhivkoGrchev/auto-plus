import type { ComponentProps } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Check, Loader } from 'lucide-react'
import { editUser } from '@/lib/actions/auth.actions'
import { useEditUserSchema, type EditUserData } from '@/lib/validators/auth'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: EditUserData = {
  name: '',
  email: '',
} as const

export interface UserDialogProps extends ComponentProps<typeof Dialog> {
  onUpdate?: () => void
}

export const UserDialog = ({ open, onOpenChange, onUpdate }: UserDialogProps) => {
  const t = useTranslations('UserDialog')
  const schema = useEditUserSchema()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserData>({ defaultValues: initialFormData, resolver: zodResolver(schema) }) //TODO solve the typing problem

  const handleFormSubmit = async (formData: EditUserData) => {
    const { data, error } = await editUser(formData)
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
              {errors.name && <span className="col-start-2 mx-2 text-xs text-red-600">{errors.name.message}</span>}
              <Label className="self-center" htmlFor="email">
                {t('email')}
              </Label>
              <Input id="email" {...register('email')} />
              {errors.email && <span className="col-start-2 mx-2 text-xs text-red-600">{errors.email.message}</span>}
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
