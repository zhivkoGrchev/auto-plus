import { MapPinPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ComponentProps, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { ProfileExtended } from '@/types/profile'
import { AddLocationForm } from './add-location.form'
import { EditLocationForm } from './edit-location.form'

export interface LocationsDialogProps extends ComponentProps<typeof Dialog> {
  profile?: ProfileExtended
  onUpdate?: () => void
}

export const LocationsDialog = ({ open, profile, onOpenChange, onUpdate }: LocationsDialogProps) => {
  const t = useTranslations('ProfileDialog')
  const [showCreateLocationForm, setShowCreateLocationForm] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('location.title')}</DialogTitle>
          <DialogDescription>{t('location.description')}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4 overflow-hidden rounded-md border">
          {profile && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('location.main')}</TableHead>
                  <TableHead>{t('contactPerson')}</TableHead>
                  <TableHead>{t('location.phone')}</TableHead>
                  <TableHead>{t('location.email')}</TableHead>
                  <TableHead>{t('location.address')}</TableHead>
                  <TableHead>{t('location.city')}</TableHead>
                  <TableHead>{t('location.postcode')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {showCreateLocationForm && (
                  <AddLocationForm
                    profileId={profile.id}
                    onUpdate={() => {
                      onOpenChange?.(false)
                      onUpdate?.()
                    }}
                  />
                )}
                {profile.locations.length ? (
                  profile.locations.map((item) => (
                    <EditLocationForm
                      key={item.id}
                      location={item}
                      onUpdate={() => {
                        onOpenChange?.(false)
                        onUpdate?.()
                      }}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="p-4 text-xl text-center">
                      {t('noLocation')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => setShowCreateLocationForm((show) => !show)}>
            <MapPinPlus />
            {t('add.location')}
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">{t('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
