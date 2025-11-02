import { type ChangeEvent, type ComponentProps, type MouseEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Check, Loader } from 'lucide-react'
import { editUser } from '@/lib/actions/auth.actions'
import { useEditUserSchema, type EditUserData } from '@/lib/validators/user'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialFormData: EditUserData = {
  name: '',
  email: '',
}

export interface UserDialogProps extends ComponentProps<typeof Dialog> {
  onUpdate?: () => void
}

export const UserDialog = ({ open, onOpenChange, onUpdate }: UserDialogProps) => {
  const [formData, setFormData] = useState<EditUserData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = useEditUserSchema()
  const t = useTranslations('EditUserDialog')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    startTransitionSubmit(async () => {
      const validation = schema.safeParse(formData)
      if (validation.success) {
        const { data, error } = await editUser(validation.data)
        if (error) {
          toast.error(error.message)
          return
        }
        onUpdate?.()
        onOpenChange?.(false)
        setFormData(initialFormData)
        toast.success(data)
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
            <Label className="self-center" htmlFor="name">
              {t('name')}
            </Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
            <Label className="self-center" htmlFor="email">
              {t('email')}
            </Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            {formErrors.email && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors.email[0]}</span>}
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
