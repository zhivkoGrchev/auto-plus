'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { deleteCar, getCars, toggleCarListing } from '@/lib/actions/car.actions'
import { getProfilesWithLocations } from '@/lib/actions/profile.actions'
import type { CarExtended } from '@/lib/types/car'
import type { ProfileExtended } from '@/lib/types/profile'
import type { Location } from '@prisma/client'
import { Loader, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { CarDialog } from './car.dialog'
import { CarsTable } from './cars.table'

export const CarsList = () => {
  const [profiles, setProfiles] = useState<ProfileExtended[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [currentProfileId, setCurrentProfileId] = useState<string | undefined>()
  const [currentLocationId, setCurrentLocationId] = useState<string | undefined>()
  const [cars, setCars] = useState<CarExtended[]>([])
  const [editingCar, setEditingCar] = useState<CarExtended | undefined>()
  const [openCarDialog, setOpenCarDialog] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    startTransition(async () => {
      try {
        const { data, error } = await getProfilesWithLocations()
        if (error) {
          toast.error(error.message)
          router.push('/admin/profiles')
          return
        }
        setProfiles(data)
        const selectedProfile = data[0]
        setCurrentProfileId(selectedProfile.id)
        setLocations(selectedProfile.locations)
        const selectedLocation =
          selectedProfile.locations.length > 1
            ? selectedProfile.locations.find((item) => item.isDefault) || selectedProfile.locations[0]
            : selectedProfile.locations[0]
        if (!selectedLocation) {
          toast.error('There are no locations')
          return
        }
        setCurrentLocationId(selectedLocation.id)
        startTransition(async () => {
          const { data, error } = await getCars(selectedProfile.id, selectedLocation.id)
          if (error) return
          setCars(data)
        })
      } catch (error) {
        const e = error as Error
        console.error('Error fetching profiles:', e.message)
      }
    })
  }, [])

  const handleProfileChange = async (value: string) => {
    const selectedProfile = profiles.find((item) => item.id === value)
    if (!selectedProfile) {
      setCars([])
      toast.error('There is no profile')
      return
    }
    setCurrentProfileId(selectedProfile.id)
    setLocations(selectedProfile.locations)
    const selectedLocation =
      selectedProfile.locations.length > 1
        ? selectedProfile.locations.find((item) => item.isDefault) || selectedProfile.locations[0]
        : selectedProfile.locations[0]
    if (!selectedLocation) {
      setCars([])
      toast.error('There are no locations')
      return
    }
    setCurrentLocationId(selectedLocation.id)
    startTransition(async () => {
      const { data, error } = await getCars(selectedProfile.id, selectedLocation.id)
      if (error) {
        setCars([])
        toast.error(error.message)
        return
      }
      setCars(data)
    })
  }

  const handleLocationChange = async (value: string) => {
    if (!currentProfileId) {
      setCars([])
      toast.error('There is no profile')
      return
    }
    setCurrentLocationId(value)
    startTransition(async () => {
      const { data, error } = await getCars(currentProfileId, value)
      if (error) {
        setCars([])
        toast.error(error.message)
        return
      }
      setCars(data)
    })
  }

  const handleDelete = async (id: string) => {
    const { data, error } = await deleteCar(id)
    if (error) {
      toast.error(error.message)
      return
    }
    setCars((prev) => prev.filter((car) => car.id !== id))
    toast.success(data)
  }

  const handleToggleListing = async (id: string, value: boolean) => {
    setCars((prev) => prev.map((car) => (car.id === id ? { ...car, listedOnWebsite: value } : car)))
    const { data, error } = await toggleCarListing(id, value)
    if (error) {
      setCars((prev) => prev.map((car) => (car.id === id ? { ...car, listedOnWebsite: !value } : car)))
      toast.error(error.message)
      return
    }
    toast.success(data)
  }

  const handleUpdate = async () => {
    if (!currentProfileId || !currentLocationId) return
    startTransition(async () => {
      const { data, error } = await getCars(currentProfileId, currentLocationId)
      if (error) {
        setCars([])
        toast.error(error.message)
        return
      }
      setCars(data)
    })
    closeCarDialog()
  }

  const openAddCarDialog = () => {
    setEditingCar(undefined)
    setOpenCarDialog(true)
  }
  const openEditCarDialog = (car: CarExtended) => {
    setEditingCar(car)
    setOpenCarDialog(true)
  }
  const closeCarDialog = () => {
    setEditingCar(undefined)
    setOpenCarDialog(false)
  }

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <Loader size="1em" className="animate-spin" /> Loading ...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <Card>
        <CardContent>
          <div className="flex justify-end gap-2">
            <Select value={currentProfileId} onValueChange={handleProfileChange}>
              <SelectTrigger className="" aria-label="Profile">
                <SelectValue placeholder="Select Profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={currentLocationId} disabled={!currentProfileId} onValueChange={handleLocationChange}>
              <SelectTrigger className="" aria-label="Location">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.city}, {item.address}
                  </SelectItem>
                )) || <div className="flex justify-center">Select Profile</div>}
              </SelectContent>
            </Select>
            <Button onClick={() => openAddCarDialog()}>
              <Plus />
              Add a new car
            </Button>
          </div>
        </CardContent>
      </Card>
      <CarsTable data={cars} onEdit={openEditCarDialog} onDelete={handleDelete} onToggleListing={handleToggleListing} />
      <CarDialog
        open={openCarDialog}
        onOpenChange={(value) => (!value ? closeCarDialog() : setOpenCarDialog(value))}
        car={editingCar}
        profileId={currentProfileId}
        locationId={currentLocationId}
        onUpdate={handleUpdate}
      />
    </div>
  )
}
