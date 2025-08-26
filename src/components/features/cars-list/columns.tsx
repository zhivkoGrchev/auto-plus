'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Car } from '@prisma/client'
import { deleteCar } from '@/lib/actions/car.actions'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: 'brand.name',
    header: 'Brand',
  },
  {
    accessorKey: 'model.name',
    header: 'Model',
  },
  {
    accessorKey: 'year',
    header: () => <div className="text-right">First registration</div>,
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
    header: () => <div className="text-right">Price</div>,
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

      const handleDelete = async () => {
        // Optional: Show confirmation dialog
        if (!window.confirm('Are you sure you want to delete this car?')) return
        // Call your server action
        const result = await deleteCar(car.id)
        if (result.success) {
          // Optionally show a toast or notification
          // Refresh data (router.refresh() for Next.js 13/14)
        } else {
          alert(result.errors?.form?.[0] ?? 'Failed to delete car.')
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
