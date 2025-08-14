'use client'

import { useEffect, useState } from 'react'
import { getAllCars } from '@/lib/actions/car.actions'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBack2Line } from 'react-icons/ri'

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
    <div className="container mx-auto px-4 overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-lg border-2 border-cyan-100">
        <thead className="bg-cyan-900 border-2 border-cyan-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Color</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Mileage</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Edit</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyan-100">
          {cars.map((car) => (
            <tr key={car.id} className="bg-cyan-800 hover:bg-cyan-600 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-900 font-bold">{car.brand.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">{car.model.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">{car.year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">{car.color}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800 font-medium">€ {car.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">{car.mileage.toLocaleString()} km</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">
                <FaEdit />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-cyan-800">
                <RiDeleteBack2Line />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
