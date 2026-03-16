'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDebouncedValue } from '@/lib/hooks/debounced-value'
import type { CarExtended } from '@/lib/types/car'
import { normalize } from '@/lib/utils'
import { columns } from './columns'

export interface CarsTableProps {
  data: CarExtended[]
  onEdit: (car: CarExtended) => void | Promise<void>
  onDelete: (id: string) => void | Promise<void>
  onToggleListing: (id: string, value: boolean) => void | Promise<void>
}

export function CarsTable({ data, onEdit, onDelete, onToggleListing }: CarsTableProps) {
  const t = useTranslations('CarDialog')
  const [sorting, setSorting] = useState<SortingState>([])
  const [query, setQuery] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const debouncedQuery = useDebouncedValue(query, 200)
  const table = useReactTable({
    data,
    columns: columns(onEdit, onDelete, onToggleListing, t),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setQuery,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter: debouncedQuery, // single source of truth
      columnVisibility,
      rowSelection,
    },
    // Search BOTH brand + model with tokenized OR-per-field / AND-per-token logic
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = normalize(filterValue)
      if (!q) return true
      const tokens = q.split(/\s+/).filter(Boolean)

      // support either flattened fields (brand_name/model_name) or nested (brand.name/model.name)
      const brandRaw = (row.original as any).brand_name ?? (row.original as any).brand?.name ?? ''
      const modelRaw = (row.original as any).model_name ?? (row.original as any).model?.name ?? ''

      const brand = normalize(brandRaw)
      const model = normalize(modelRaw)

      // each token must be found in EITHER field
      return tokens.every((t) => brand.includes(t) || model.includes(t))
    },
    // expose query to cells (optional: for highlighting)
    meta: { query: debouncedQuery },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input placeholder={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />
        {query && (
          <Button variant="ghost" size="sm" onClick={() => setQuery('')}>
            Clear
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('columns')}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {t(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-primary">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t('noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        {/*
        <div className="flex items-center justify-end space-x-2">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        */}
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            {t('pervious')}
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  )
}
