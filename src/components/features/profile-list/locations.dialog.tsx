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
  const t = useTranslations('LocationsDialog')
  const [showCreateLocationForm, setShowCreateLocationForm] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4 overflow-hidden rounded-md border">
          {profile && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Main</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Postcode</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                      There is no locations
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
            Add location
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
