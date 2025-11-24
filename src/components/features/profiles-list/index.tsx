'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Loader, Trash } from 'lucide-react'
import { deleteProfile, getProfilesWithLocations } from '@/lib/actions/profile.actions'
import { ProfileDialog } from './profile.dialog'
import { LocationsDialog } from './locations.dialog'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ProfileWithLocations } from '@/lib/types/profile'
import type { Location } from '@prisma/client'

export const ProfilesList = () => {
  const [profiles, setProfiles] = useState<ProfileWithLocations[] | undefined>(undefined)
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
      const location = locations.find((item) => item.isDefault)
      if (location) {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h5 className="px-4 py-2 text-xl font-bold">Contact person</h5>
              <ul className="p-4 rounded-xl border bg-cyan-100 dark:bg-cyan-900">
                <li>Name: {location.contactPerson}</li>
                <li>Phone: {location.phone}</li>
                <li>E-Mail: {location.email}</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h5 className="px-4 py-2 text-xl font-bold">Location</h5>
              <ul className="p-4 rounded-xl border bg-cyan-100 dark:bg-cyan-900">
                <li>Address: {location.address}</li>
                <li>City: {location.city}</li>
                <li>Postcode: {location.postcode}</li>
              </ul>
            </div>
          </div>
        )
      }
    }
    return <div className="p-8 flex justify-center items-center rounded-xl border bg-cyan-100 dark:bg-cyan-900">There is no default location</div>
  }

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <div className="flex justify-end">
        <ProfileDialog onUpdate={fetchProfiles} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {profiles?.length ? (
          profiles?.map((item) => (
            <Card className="" key={item.id}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-xs h-xs flex justify-center items-center rounded-xl border">{item.logo}</div>
                  <ul className="flex flex-col">
                    <li>
                      Company: <span className="font-bold">{item.company}</span>
                    </li>
                    <li>Slug: {item.slug}</li>
                    <li className="text-sm">Created: {item.createdAt.toDateString()}</li>
                    <li className="text-sm">Updated: {item.updatedAt.toDateString()}</li>
                  </ul>
                </div>
                {renderDefaultLocation(item.locations)}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <LocationsDialog profile={item} onUpdate={fetchProfiles} />
                <ProfileDialog profile={item} onUpdate={fetchProfiles} />
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
    </div>
  )
}
