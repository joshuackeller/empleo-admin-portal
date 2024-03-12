import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
  applications?: Application[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching?: boolean;
  isClickable?: boolean;
  linkBaseRoute?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching = false,
  isClickable = false,
  linkBaseRoute,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const baseRoute = linkBaseRoute || router.pathname;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 100,
    },
  });

  //emily's attempt at routing function for all tables.

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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
