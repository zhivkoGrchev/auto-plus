import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createProfile, editProfile } from '@/lib/actions/profile.actions'
import type { Profile } from '@prisma/client'
import type { ProfileData } from '@/lib/validators/profile'
import { ProfileForm } from './profile.form'

export interface ProfileDialogProps {
  trigger?: ReactNode
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ trigger, profile, onUpdate }: ProfileDialogProps) => {
  const [isOpen, setOpen] = useState(false)
  const t = useTranslations('ProfileDialog')

  const handleSubmit = async (profile: ProfileData, profileId?: string) => {
    const { data, error } = await (!profileId ? createProfile(profile) : editProfile(profile, profileId))
    if (error) {
      toast.error(error.message)
      return
    }
    onUpdate?.()
    toast.success(data)
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ? trigger : <Button>{!profile ? t('creationTrigger') : t('editingTrigger')}</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!profile ? t('creationTitle') : t('editingTitle')}</DialogTitle>
          <DialogDescription>{!profile ? t('creationDescription') : t('editingDescription')}</DialogDescription>
        </DialogHeader>
        <ProfileForm profile={profile} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
