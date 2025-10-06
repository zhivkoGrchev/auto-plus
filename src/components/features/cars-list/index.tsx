'use client'

import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { getAllCars, deleteCar, toggleCarListing } from '@/lib/actions/car.actions'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { DataTable } from './data-table'
import { columns } from './columns'
import { AddCarDialog } from './add-car-dialog'

export const CarsList = () => {
  const [cars, setCars] = useState<CarExtended[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCar, setEditingCar] = useState<CarExtended | null>(null)

  const fetchCars = async () => {
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
    if (result.success) {
      setCars((prev) => prev.filter((car) => car.id !== id)) // remove deleted car
    } else {
      alert(result.errors?.form?.[0] ?? 'Failed to delete car.')
    }
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
    const fetchCars = async () => {
      try {
        const carsData = await getAllCars()
        setCars(carsData)
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <FaSpinner className="animate-spin" /> Loading ...
      </div>
    )

  return (
    <div className="container mx-auto px-4">
      <AddCarDialog onCarAdded={fetchCars} />
      <DataTable columns={columns(handleDelete, handleToggleListing, handleEdit)} data={cars} />

      {editingCar && (
        <AddCarDialog
          mode="edit"
          car={editingCar}
          onSuccess={async () => {
            await fetchCars()
            setEditingCar(null)
          }}
        />
      )}
    </div>
  )
}
