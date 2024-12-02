"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel
} from "@tanstack/react-table"
import { cn } from "@/src/lib/utils"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import { Checkbox } from "@/src/components/ui/checkbox"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table"

interface DataTableProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataPaginationTable = React.forwardRef<HTMLDivElement, DataTableProps<any, any>>(
  ({ columns, data, className, ...props }, ref) => {

    const [filterValue, setFilterValue] = React.useState("")

    const selectionColumn: ColumnDef<any, any> = {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }

    const tableColumns = [selectionColumn, ...columns]

    const table = useReactTable({
      data,
      columns: tableColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        globalFilter: filterValue,
      },
      onGlobalFilterChange: setFilterValue,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })

    return (
      <div className={`data-table-wrapper ${className}`} ref={ref} {...props}>
        <div className="data-table-header">
          <Input
            placeholder="Filter emails..."
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            className="data-table-input"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="data-table-dropdown-button">
                Columns <ChevronDown className="data-table-dropdown-icon" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className={`data-table-container ${cn('dark:data-table-container-dark')}`}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              const isCurrentlySorted = header.column.getIsSorted();
                              header.column.toggleSorting(isCurrentlySorted ? undefined : true);
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="data-table-row hover"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-slate-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="data-table-pagination">
          <div className="data-table-pagination-info">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="data-table-pagination-buttons">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="data-table-pagination-button data-table-pagination-button-outline"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="data-table-pagination-button data-table-pagination-button-outline"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

DataPaginationTable.displayName = "DataPaginationTable"

export { DataPaginationTable }