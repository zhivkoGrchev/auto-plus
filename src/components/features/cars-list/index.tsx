'use client'

import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { getAllCars } from '@/lib/actions/car.actions'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { DataTable } from './data-table'
import { columns } from './columns'
import { AddCarDialog } from './add-car-dialog'

export const CarsList = () => {
  const [cars, setCars] = useState<CarExtended[]>([])
  const [loading, setLoading] = useState(true)

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
      <DataTable columns={columns} data={cars} />
    </div>
  )
}
