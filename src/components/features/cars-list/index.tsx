'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FaSpinner } from 'react-icons/fa'
import { getProfiles } from '@/lib/actions/profile.actions'
import { getAllCars, deleteCar, toggleCarListing } from '@/lib/actions/car.actions'
import type { Profile } from '@prisma/client'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { ProfileDialog } from '../profiles-list/profile.dialog'
import { AddCarDialog } from './add-car-dialog'
import { DataTable } from './data-table'
import { columns } from './columns'

export const CarsList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [cars, setCars] = useState<CarExtended[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCar, setEditingCar] = useState<CarExtended | null>(null)

  const fetchProfiles = async () => {
    setLoading(true)
    try {
      const { data, error } = await getProfiles()
      if (error || !data.length) {
        toast.error(error?.message || 'There are no profiles')
        return
      }
      setProfiles(data)
    } catch (error) {
      const e = error as Error
      console.error('Error fetching profiles:', e.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCars = async () => {
    setLoading(true)
    try {
      const carsData = await getAllCars()
      setCars(carsData)
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return
    const result = await deleteCar(id)
    if (!result.success) {
      toast.error(result.errors?.form?.[0] ?? 'Failed to delete car.')
      return
    }
    setCars((prev) => prev.filter((car) => car.id !== id))
  }

  const handleToggleListing = async (id: string, value: boolean) => {
    // Optimistic update
    setCars((prev) => prev.map((car) => (car.id === id ? { ...car, listedOnWebsite: value } : car)))

    const result = await toggleCarListing(id, value)

    if (!result.success) {
      // Revert optimistic update on error
      setCars((prev) => prev.map((car) => (car.id === id ? { ...car, listedOnWebsite: !value } : car)))

      alert(result.error || 'Failed to update listing status')
    }
  }

  const handleEdit = (car: CarExtended) => {
    setEditingCar(car)
  }

  useEffect(() => {
    fetchProfiles()
    fetchCars()
  }, [])

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <FaSpinner className="animate-spin" /> Loading ...
      </div>
    )

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <div className="flex justify-end gap-2">
        {profiles.length ? null : <ProfileDialog />}
        <AddCarDialog profileId={profiles?.[0]?.id} onUpdate={fetchCars} />
      </div>
      <DataTable columns={columns(handleDelete, handleToggleListing, handleEdit)} data={cars} />
      {editingCar && (
        <AddCarDialog
          mode="edit"
          car={editingCar}
          onUpdate={async () => {
            await fetchCars()
            setEditingCar(null)
          }}
        />
      )}
    </div>
  )
}
