import type { Profile } from '@prisma/client'
import { Building, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreateProfileForm } from './create-profile.form'
import { EditProfileForm } from './edit-profile.form'

export interface ProfileDialogProps extends ComponentProps<typeof Dialog> {
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ open, onOpenChange, profile, onUpdate }: ProfileDialogProps) => {
  const t = useTranslations('ProfileDialog')

  const handleUpdate = () => {
    onUpdate?.()
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {!profile ? (
          <Button className="bg-cyan-700 text-cyan-50 hover:bg-cyan-800 hover:cursor-pointer">
            <Building /> Create profile
          </Button>
        ) : (
          <Button className="bg-cyan-700 text-cyan-50 hover:bg-cyan-800 hover:cursor-pointer">
            <Pencil /> Edit profile
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(!profile ? 'create.title' : 'edit.title')}</DialogTitle>
          <DialogDescription>{t(!profile ? 'create.description' : 'edit.description')}</DialogDescription>
        </DialogHeader>
        {!profile ? <CreateProfileForm onUpdate={handleUpdate} /> : <EditProfileForm profile={profile} onUpdate={handleUpdate} />}
      </DialogContent>
    </Dialog>
  )
}
