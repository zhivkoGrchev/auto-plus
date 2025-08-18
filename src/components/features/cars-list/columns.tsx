'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Car } from '@prisma/client'

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
    header: 'Year',
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: 'transmission',
    header: 'Transmission',
  },
]
