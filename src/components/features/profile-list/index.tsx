'use client'

import { Building, Loader, MapPinPen, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deleteProfile, getProfilesWithLocations } from '@/lib/actions/profile.actions'
import type { ProfileExtended } from '@/lib/types/profile'
import type { Location } from '@/prisma/generated'
import { LocationsDialog } from './locations.dialog'
import { ProfileDialog } from './profile.dialog'

export const ProfileList = () => {
  const [profiles, setProfiles] = useState<ProfileExtended[] | undefined>(undefined)
  const [currentProfile, setCurrentProfile] = useState<ProfileExtended | undefined>()
  const [openProfileDialog, setOpenProfileDialog] = useState<boolean>(false)
  const [openLocationsDialog, setOpenLocationsDialog] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const fetchProfiles = useCallback(() => {
    startTransition(async () => {
      const { data, error } = await getProfilesWithLocations()
      if (error) {
        toast.error(error.message)
        return
      }
      setProfiles(data)
    })
  }, [])

  useEffect(() => fetchProfiles(), [fetchProfiles])

  const handleDeleteProfile = async (id: string) => {
    const { data, error } = await deleteProfile(id)
    if (error) {
      toast.error(error.message)
      return
    }
    fetchProfiles()
    toast.success(data)
  }

  const openAddProfileDialog = () => {
    setCurrentProfile(undefined)
    setOpenProfileDialog(true)
  }
  const openEditProfileDialog = (profile: ProfileExtended) => {
    setCurrentProfile(profile)
    setOpenProfileDialog(true)
  }
  const closeProfileDialog = () => {
    setOpenProfileDialog(false)
    setCurrentProfile(undefined)
  }
  const openEditLocationsDialog = (profile: ProfileExtended) => {
    setCurrentProfile(profile)
    setOpenLocationsDialog(true)
  }
  const closeLocationsDialog = () => {
    setOpenLocationsDialog(false)
    setCurrentProfile(undefined)
  }

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <Loader size="1em" className="animate-spin" /> Loading ...
      </div>
    )
  }

  const renderMainLocation = (locations: Location[]) => {
    if (locations.length) {
      const location = locations.find((item) => item.isMain)
      if (location) {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h5 className="px-4 py-2 text-xl font-bold">Main location</h5>
              <ul className="p-4 rounded-xl border bg-cyan-50 dark:bg-cyan-950">
                <li>Address: {location.address}</li>
                <li>City: {location.city}</li>
                <li>Postcode: {location.postcode}</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h5 className="px-4 py-2 text-xl font-bold">Contact person</h5>
              <ul className="p-4 rounded-xl border bg-cyan-50 dark:bg-cyan-950">
                <li>Name: {location.contactPerson}</li>
                <li>Phone: {location.phone}</li>
                <li>E-Mail: {location.email}</li>
              </ul>
            </div>
          </div>
        )
      }
    }
    return <div className="p-8 flex justify-center items-center rounded-xl border bg-cyan-100 dark:bg-cyan-900">There is no main location</div>
  }

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => openAddProfileDialog()}>
          <Building /> Add profile
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {profiles?.length ? (
          profiles?.map((item) => (
            <Card className="" key={item.id}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 flex flex-col justify-center items-center rounded-md border border-dashed">
                    <Image src={item.imageUrl ? item.imageUrl : '/images/no-image.svg'} width={96} height={96} alt="Logo" />
                  </div>
                  <ul className="flex flex-col">
                    <li>
                      Company: <span className="font-bold">{item.company}</span>
                    </li>
                    <li>Slug: {item.slug}</li>
                    <li className="text-sm">Created: {item.createdAt.toDateString()}</li>
                    <li className="text-sm">Updated: {item.updatedAt.toDateString()}</li>
                  </ul>
                </div>
                {renderMainLocation(item.locations)}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => openEditLocationsDialog(item)}>
                  <MapPinPen /> Locations
                </Button>
                <Button variant="secondary" onClick={() => openEditProfileDialog(item)}>
                  <Pencil /> Edit profile
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteProfile(item.id)}>
                  <Trash />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="p-8 col-span-2 flex flex-col justify-center items-center rounded-xl border">There is no Profiles</div>
        )}
      </div>
      <ProfileDialog
        open={openProfileDialog}
        profile={currentProfile}
        onOpenChange={(value) => (!value ? closeProfileDialog() : setOpenProfileDialog(value))}
        onUpdate={fetchProfiles}
      />
      <LocationsDialog
        open={openLocationsDialog}
        profile={currentProfile}
        onOpenChange={(value) => (!value ? closeLocationsDialog() : setOpenLocationsDialog(value))}
        onUpdate={fetchProfiles}
      />
    </div>
  )
}
