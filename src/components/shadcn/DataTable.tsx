import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/shadcn/Table";
import { cn } from "@/src/utilities/cn";
import { useRouter } from "next/router";
import { Application } from "@/src/utilities/interfaces";
import * as React from "react";
import { Input } from "@/src/components/shadcn/Input";

interface DataTableProps<TData, TValue> {
  applications?: Application[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching?: boolean;
  isClickable?: boolean;
  linkBaseRoute?: string;
  // columnNames: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching = false,
  isClickable = false,
  linkBaseRoute,
}: // columnNames,
DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const router = useRouter();
  const baseRoute = linkBaseRoute || router.pathname;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 100,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleRowClick = (
    baseRoute: string,
    id: string,
    isClickable: boolean
  ) => {
    if (isClickable) {
      router.push(`${baseRoute}/${id}`);
    }
  };

  return (
    <div>
      {/* <div className="flex items-center py-4">
      <Input
          placeholder="Search table..."
          onChange={(event) => {
            const value = event.target.value;
            columnNames.forEach((name) => {
              const column = table.getColumn(name);
              if (column) {
                column.setFilterValue(value);
              }
            });
          }}
          className="max-w-sm"
        />
      </div> */}
      <div
        className={cn(
          "rounded-md border ",
          isFetching && "bg-gray-100 dark:bg-gray-900 animate-pulse"
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-inherit">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() =>
                    handleRowClick(
                      baseRoute,
                      (row.original as any).id,
                      isClickable
                    )
                  }
                  className={cn(
                    isClickable ? "cursor-pointer" : "hover:bg-inherit"
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
