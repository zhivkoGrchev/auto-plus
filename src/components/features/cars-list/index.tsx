'use client'

import { useEffect, useState } from 'react'
import { getAllCars } from '@/lib/actions/car.actions'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { DataTable } from './data-table'
import { columns } from './columns'

export { AddCarDialog } from './add-car-dialog'

export const CarsList = () => {
  const [cars, setCars] = useState<CarExtended[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div>Loading cars...</div>

  return (
    <div className="container mx-auto px-4">
      <DataTable columns={columns} data={cars} />
    </div>
  )
}
