'use client'

import { Building, Loader, MapPinPen, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deleteProfile, getProfilesWithLocations } from '@/lib/actions/profile.actions'
import type { ProfileExtended } from '@/lib/types/profile'
import type { Location } from '@/prisma/generated'
import { LocationsDialog } from './locations.dialog'
import { ProfileDialog } from './profile.dialog'

export const ProfilesList = () => {
  const [profiles, setProfiles] = useState<ProfileExtended[] | undefined>(undefined)
  const [currentProfile, setCurrentProfile] = useState<ProfileExtended | undefined>()
  const [openProfileDialog, setOpenProfileDialog] = useState<boolean>(false)
  const [openLocationsDialog, setOpenLocationsDialog] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const fetchProfiles = () => {
    startTransition(async () => {
      const { data, error } = await getProfilesWithLocations()
      if (error) {
        toast.error(error.message)
        return
      }
      setProfiles(data)
    })
  }

  useEffect(() => fetchProfiles(), [])

  const handleDeleteProfile = async (id: string) => {
    const { data, error } = await deleteProfile(id)
    if (error) {
      toast.error(error.message)
      return
    }
    fetchProfiles()
    toast.success(data)
  }

  const handleUpdate = async () => {
    setOpenProfileDialog(false)
    setOpenLocationsDialog(false)
    setCurrentProfile(undefined)
    fetchProfiles()
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
              <h5 className="px-4 py-2 text-xl font-bold">Location</h5>
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
        <Button className="bg-cyan-700 text-cyan-50 hover:bg-cyan-800 hover:cursor-pointer" onClick={() => openAddProfileDialog()}>
          <Building /> Add profile
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {profiles?.length ? (
          profiles?.map((item) => (
            <Card className="" key={item.id}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 flex flex-col justify-center items-center gap-2 rounded-xl border border-dashed">
                    <Image src="/images/no-image.svg" width={96} height={96} alt="Logo" />
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
                <Button className="bg-cyan-700 text-cyan-50 hover:bg-cyan-800 hover:cursor-pointer" onClick={() => openEditLocationsDialog(item)}>
                  <MapPinPen /> Locations
                </Button>
                <Button className="bg-cyan-700 text-cyan-50 hover:bg-cyan-800 hover:cursor-pointer" onClick={() => openEditProfileDialog(item)}>
                  <Pencil /> Edit profile
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteProfile(item.id)} className="hover:cursor-pointer">
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
        onUpdate={handleUpdate}
      />
      <LocationsDialog
        open={openLocationsDialog}
        profile={currentProfile}
        onOpenChange={(value) => (!value ? closeLocationsDialog() : setOpenLocationsDialog(value))}
        onUpdate={handleUpdate}
      />
    </div>
  )
}
