'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { parseAsInteger, useQueryState } from 'nuqs'
import { usePathname } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  limit: number
  total: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  limit,
  total,
}: DataTableProps<TData, TValue>) {
  const [pageNumber, setPageNumber] = useQueryState(
    'page',
    parseAsInteger.withDefault(page).withOptions({ shallow: false })
  )
  const [limitNumber, setLimitNumber] = useQueryState(
    'limit',
    parseAsInteger.withDefault(limit).withOptions({ shallow: false })
  )

  const pathName = usePathname()

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize: limitNumber,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
    onPaginationChange: () => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      setPageNumber(pageIndex)
      setLimitNumber(pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-4 rounded-md bg-muted/40">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getRowModel().rows?.length > 0 && (
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-5 mt-4">
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Rows per page
            </span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                setPageNumber(1)
                setLimitNumber(Number(value))
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{`Page ${page} of ${table.getPageCount()}`}</span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={!table.getCanPreviousPage()}
                    href={`${pathName}?page=${page - 1}&limit=${limit}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    disabled={!table.getCanNextPage()}
                    href={`${pathName}?page=${page + 1}&limit=${limit}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
