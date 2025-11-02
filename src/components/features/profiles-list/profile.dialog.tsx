import type { ComponentProps } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { createProfile, editProfile } from '@/lib/actions/profile.actions'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProfileForm } from './profile.form'
import type { CreateProfileData, EditProfileData } from '@/lib/validators/profile'
import type { Profile } from '@prisma/client'

export interface ProfileDialogProps extends ComponentProps<typeof Dialog> {
  profile?: Profile
  onUpdate?: () => void
}

export const ProfileDialog = ({ open, onOpenChange, profile, onUpdate }: ProfileDialogProps) => {
  const t = useTranslations('ProfileDialog')

  const handleSubmit = async (profile: CreateProfileData | EditProfileData, profileId?: string) => {
    const { data, error } = await (!profileId ? createProfile(profile as CreateProfileData) : editProfile(profile, profileId))
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
          <DialogTitle>{t(!profile ? 'create.title' : 'edit.title')}</DialogTitle>
          <DialogDescription>{t(!profile ? 'create.description' : 'edit.description')}</DialogDescription>
        </DialogHeader>
        <ProfileForm profile={profile} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
