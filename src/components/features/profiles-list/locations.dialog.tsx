import { useState, type JSX, type ComponentProps } from 'react'
import { useTranslations } from 'next-intl'
import { MapPinMinus, MapPinPen, MapPinPlus } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CreateLocationForm } from './create-location.form'
import type { ProfileWithLocations } from '@/lib/types/profile'

export interface LocationsDialogProps extends ComponentProps<typeof Dialog> {
  profile: ProfileWithLocations
  trigger?: JSX.Element
  onUpdate?: () => void
}

export const LocationsDialog = ({ open, onOpenChange, profile, trigger, onUpdate }: LocationsDialogProps) => {
  const t = useTranslations('LocationsDialog')
  const [showCreateLocationForm, setShowCreateLocationForm] = useState(false)

  const handleUpdate = () => {
    onUpdate?.()
    setShowCreateLocationForm(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {!trigger ? (
          <Button>
            <MapPinPen /> Locations
          </Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Default</TableHead>
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
              {showCreateLocationForm && <CreateLocationForm profileId={profile.id} onUpdate={handleUpdate} />}
              {profile.locations.length ? (
                profile.locations.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Switch checked={item.isDefault} />
                    </TableCell>
                    <TableCell>{item.contactPerson}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.postcode}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button variant="outline" disabled>
                        <MapPinPen />
                      </Button>
                      <Button variant="destructive" disabled>
                        <MapPinMinus />
                      </Button>
                    </TableCell>
                  </TableRow>
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
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => setShowCreateLocationForm((show) => !show)}>
            <MapPinPlus />
            Create location
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
