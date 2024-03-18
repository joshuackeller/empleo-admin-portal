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
import TablePagination from "../tables/TablePagination";
import { Skeleton } from "./Skeleton";
import { UsePaginatedQueryResult } from "@/src/requests/usePaginatedQuery";

interface DataTableProps<TData, TValue> {
  applications?: Application[];
  columns: ColumnDef<TData, TValue>[];
  query: UsePaginatedQueryResult;
  isFetching?: boolean;
  isClickable?: boolean;
  linkBaseRoute?: string;
}

export function DataTable<TData, TValue>({
  columns,
  query,
  isFetching = false,
  isClickable = false,
  linkBaseRoute,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const baseRoute = linkBaseRoute || router.pathname;
  const table = useReactTable({
    data: query?.data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 100,
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

  if (query.isLoading) return <Skeleton className="h-96 w-full" />;
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
      <div className="p-1 border-t">
        <TablePagination query={query} />
      </div>
    </div>
  );
}
