'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Building, Loader, MapPinPen, Pencil, Trash } from 'lucide-react'
import { deleteProfile, getProfilesWithLocations } from '@/lib/actions/profile.actions'
import { ProfileDialog } from './profile.dialog'
import { LocationsDialog } from './locations.dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { ProfileWithLocations } from '@/lib/types/profile'
import type { Location } from '@prisma/client'

export const ProfilesList = () => {
  const [profiles, setProfiles] = useState<ProfileWithLocations[] | undefined>(undefined)
  const [openCreateProfileDialog, setOpenCreateProfileDialog] = useState(false)
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false)
  const [openLocationsDialog, setOpenLocationsDialog] = useState(false)
  const [isPendingFetch, startTransitionFetch] = useTransition()

  const fetchProfiles = () => {
    startTransitionFetch(async () => {
      const { data, error } = await getProfilesWithLocations()
      if (error) {
        toast.error(error.message)
        return
      }
      setProfiles(data)
    })
  }

  const handleDeleteProfile = async (id: string) => {
    const { data, error } = await deleteProfile(id)
    if (error) {
      toast.error(error.message)
      return
    }
    fetchProfiles()
    toast.success(data)
  }

  useEffect(() => fetchProfiles(), [])

  if (isPendingFetch) {
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <Loader size="1em" className="animate-spin" /> Loading ...
      </div>
    )
  }

  const renderDefaultLocation = (locations: Location[]) => {
    if (locations.length) {
      const location = locations.find((i) => i.isDefault)
      if (location) {
        return [
          <TableCell key="employee">{location.employee}</TableCell>,
          <TableCell key="phone">{location.phone}</TableCell>,
          <TableCell key="email">{location.email}</TableCell>,
          <TableCell key="address">{location.address}</TableCell>,
          <TableCell key="city">{location.city}</TableCell>,
          <TableCell key="postcode">{location.postcode}</TableCell>,
        ]
      }
    }
    return (
      <TableCell className="text-center" colSpan={6}>
        {'There is no default location'}
      </TableCell>
    )
  }

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenCreateProfileDialog(true)}>
          <Building /> Create profile
        </Button>
      </div>
      <ProfileDialog open={openCreateProfileDialog} onOpenChange={setOpenCreateProfileDialog} onUpdate={fetchProfiles} />
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Postcode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.length ? (
              profiles.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.logo}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  {renderDefaultLocation(item.locations)}
                  <TableCell className="flex justify-end gap-2">
                    <Button onClick={() => setOpenLocationsDialog(true)} variant="outline">
                      <MapPinPen />
                    </Button>
                    <Button onClick={() => setOpenEditProfileDialog(true)} variant="outline">
                      <Pencil />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteProfile(item.id)}>
                      <Trash />
                    </Button>
                    <ProfileDialog open={openEditProfileDialog} onOpenChange={setOpenEditProfileDialog} profile={item} onUpdate={fetchProfiles} />
                    <LocationsDialog open={openLocationsDialog} onOpenChange={setOpenLocationsDialog} profile={item} onUpdate={fetchProfiles} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="p-4 text-xl text-center">
                  No profiles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
