'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { Switch } from '@/components/ui/switch'
import { ArrowUpDown } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns = (
  handleDelete: (id: string) => void,
  handleToggleListing: (id: string, value: boolean) => Promise<void>,
  handleEdit: (car: CarExtended) => void
): ColumnDef<CarExtended>[] => [
  {
    id: 'listOnWebsite',
    header: () => (
      <div className="py-2">
        List on
        <br /> Website
      </div>
    ),
    cell: ({ row }) => (
      <Switch
        checked={row.original.listedOnWebsite}
        onCheckedChange={(value) => handleToggleListing(row.original.id, value)}
        aria-label="Toggle website listing"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'brand.name',
    header: 'Brand',
  },
  {
    accessorKey: 'model.name',
    header: 'Model',
  },
  {
    id: 'power',
    header: () => <div className="text-right">Power</div>,
    cell: ({ row }) => {
      const car = row.original
      return <div className="text-right font-medium">{`${car.powerKW} kW / ${car.powerPS} PS`}</div>
    },
  },
  {
    accessorKey: 'cubicCapacity',
    header: () => <div className="text-right">Cubic Capacity</div>,
    cell: ({ row }) => {
      const capacity = row.getValue('cubicCapacity') as number
      return <div className="text-right font-medium">{capacity ? `${capacity.toLocaleString()} cm³` : '—'}</div>
    },
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            First Registration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const FirstRegistration = Number.parseFloat(row.getValue('year'))
      const formatted = FirstRegistration
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'color',
    header: () => <div className="text-right">Color</div>,
    cell: ({ row }) => {
      const Color = row.getValue('color') as string
      const formatted = Color.charAt(0).toUpperCase() + Color.slice(1).toLowerCase()
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'transmission',
    header: () => <div className="text-right">Transmission</div>,
    cell: ({ row }) => {
      const Transmission = row.getValue('transmission') as 'manual' | 'automatic'
      const formatted = Transmission.charAt(0).toUpperCase() + Transmission.slice(1).toLowerCase()
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const car = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/cars/${car.id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(car.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
