import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Profile } from '@/prisma/generated'
import { AddProfileForm } from './add-profile.form'
import { EditProfileForm } from './edit-profile.form'

export interface ProfileDialogProps extends ComponentProps<typeof Dialog> {
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ open, profile, onOpenChange, onUpdate }: ProfileDialogProps) => {
  const t = useTranslations('ProfileDialog')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(!profile ? 'add.title' : 'edit.title')}</DialogTitle>
          <DialogDescription>{t(!profile ? 'add.description' : 'edit.description')}</DialogDescription>
        </DialogHeader>
        {!profile ? <AddProfileForm onUpdate={onUpdate} /> : <EditProfileForm profile={profile} onUpdate={onUpdate} />}
      </DialogContent>
    </Dialog>
  )
}
