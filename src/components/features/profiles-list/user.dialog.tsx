import { ChangeEvent, MouseEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { FaCheck, FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { editUser } from '@/lib/actions/profile.actions'
import { useEditUserSchema, type EditUserData } from '@/lib/validators/profile'
import { LuBuilding } from 'react-icons/lu'

const initialData: EditUserData = {
  name: '',
  email: '',
}

export interface UserDialogProps {
  onUpdate?: () => void
}

export const UserDialog = ({ onUpdate }: UserDialogProps) => {
  const [isOpen, setOpen] = useState(false)
  const [formData, setFormData] = useState<EditUserData>(initialData)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const schema = useEditUserSchema()
  const t = useTranslations('EditUserDialog')

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
        const { data, error } = await editUser(validation.data)
        if (error) {
          toast.error(error.message)
          return
        }
        onUpdate?.()
        toast.success(data)
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
        <Button>
          <LuBuilding />
          {t('trigger')}
        </Button>
      </DialogTrigger>
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
            {formErrors['email'] && <span className="col-start-2 mx-2 text-xs text-red-600">{formErrors['email'][0]}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPendingSubmit}>
            {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
