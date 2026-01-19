'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, FileText, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import type { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import type { CarExtended } from '@/lib/types/car'
import type { FuelType, VehicleType } from '@/prisma/generated'

export const columns = (
  onEdit: (car: CarExtended) => void | Promise<void>,
  onDelete: (id: string) => void | Promise<void>,
  onToggleListing: (id: string, value: boolean) => void | Promise<void>,
  t: ReturnType<typeof useTranslations<'CarDialog'>>
): ColumnDef<CarExtended>[] => [
  {
    id: 'listOnWebsite',
    header: () => (
      <div className="py-2">
        {t('listOnWebsite1')}
        <br />
        {t('listOnWebsite2')}
      </div>
    ),
    cell: ({ row }) => (
      <Switch checked={row.original.listedOnWebsite} onCheckedChange={(value) => onToggleListing(row.original.id, value)} aria-label="Toggle website listing" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'brand.name',
    header: () => <div className="text-left">{t('brand')}</div>,
  },
  {
    accessorKey: 'model.name',
    header: () => <div className="text-left">{t('model')}</div>,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {/* {t('year')} */}
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
    accessorKey: 'fuelType',
    header: () => <div className="text-right">{t('fuelType')}</div>,
    cell: ({ row }) => {
      const fuelType = row.getValue('fuelType') as FuelType | null
      const formatted = fuelType ? fuelType.charAt(0).toUpperCase() + fuelType.slice(1).toLowerCase() : '—'
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'power',
    header: () => <div className="text-right">{t('power')}</div>,
    cell: ({ row }) => {
      const car = row.original
      return <div className="text-right font-medium">{`${car.powerKW} kW / ${car.powerPS} PS`}</div>
    },
  },
  {
    accessorKey: 'cubicCapacity',
    header: () => <div className="text-right">{t('cubicCapacity')}</div>,
    cell: ({ row }) => {
      const capacity = row.getValue('cubicCapacity') as number
      return <div className="text-right font-medium">{capacity ? `${capacity.toLocaleString()} cm³` : '—'}</div>
    },
  },
  {
    accessorKey: 'color',
    header: () => <div className="text-right">{t('color')}</div>,
    cell: ({ row }) => {
      const Color = row.getValue('color') as string
      const formatted = Color.charAt(0).toUpperCase() + Color.slice(1).toLowerCase()
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'seats',
    header: () => <div className="text-right">{t('seats')}</div>,
    cell: ({ row }) => {
      const seats = row.getValue('seats') as number | null
      return <div className="text-right font-medium">{seats ?? '—'}</div>
    },
  },
  {
    accessorKey: 'doors',
    header: () => <div className="text-right">{t('doors')}</div>,
    cell: ({ row }) => {
      const doors = row.getValue('doors') as number | null
      return <div className="text-right font-medium">{doors ?? '—'}</div>
    },
  },
  {
    accessorKey: 'vehicleType',
    header: () => <div className="text-right">{t('vehicleType')}</div>,
    cell: ({ row }) => {
      const vehicleType = row.getValue('vehicleType') as VehicleType | null
      return <div className="text-right font-medium">{vehicleType ? t(vehicleType) : '—'}</div>
    },
  },
  {
    accessorKey: 'mot',
    header: () => <div className="text-right">{t('mot')}</div>,
    cell: ({ row }) => {
      const mot = row.getValue('mot') as Date | null
      const formatted = mot ? `${String(new Date(mot).getMonth() + 1).padStart(2, '0')}/${new Date(mot).getFullYear()}` : '—'
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'transmission',
    header: () => <div className="text-right">{t('transmission')}</div>,
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
            {t('price')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2,
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
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
              <Link href={`/cars/${row.original.id}`}>
                <FileText />
                Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
