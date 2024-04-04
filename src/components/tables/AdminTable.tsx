import useGetAdmins from "@/src/requests/admins/useGetAdmins";
import { DataTable } from "@/src/components/shadcn/DataTable";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import { Button } from "../shadcn/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import useRemoveAdmin from "@/src/requests/admins/useRemoveAdmin";
import useAuthContext from "@/src/utilities/useAuthContext";
import ReadJWTData from "@/src/utilities/ReadJWTData";
import { UsePaginatedQueryResult } from "@/src/requests/usePaginatedQuery";
import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";

type AdminTableProps = {
  query: UsePaginatedQueryResult;
  onSort?: (columnName: string, direction: "asc" | "desc") => void;
};

const AdminTable = ({ query, onSort }: AdminTableProps) => {
  const { token } = useAuthContext();
  const tokenData = ReadJWTData(token || "");

  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (columnName: string) => {
    let direction: "asc" | "desc" = "asc";
    if (selectedColumn === columnName) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    setSelectedColumn(columnName);
    setSortDirection(direction);
    onSort && onSort(columnName, direction);
  };

  return (
    <DataTable
      query={query}
      columns={[
        {
          accessorKey: "firstName",
          header: ({ column }) => {
            return (
              <Button variant="sort" onClick={() => handleSort("firstName")}>
                First Name
                {selectedColumn === "firstName" ? (
                  sortDirection === "asc" ? (
                    <ArrowUp className="ml-2 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-2 h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                )}
              </Button>
            );
          },
          size: 200,
        },
        {
          accessorKey: "lastName",
          header: ({ column }) => {
            return (
              <Button variant="sort" onClick={() => handleSort("lastName")}>
                Last Name
                {selectedColumn === "lastName" ? (
                  sortDirection === "asc" ? (
                    <ArrowUp className="ml-2 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-2 h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                )}
              </Button>
            );
          },
          size: 200,
        },
        {
          accessorKey: "email",
          header: ({ column }) => {
            return (
              <Button variant="sort" onClick={() => handleSort("email")}>
                Email
                {selectedColumn === "email" ? (
                  sortDirection === "asc" ? (
                    <ArrowUp className="ml-2 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-2 h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                )}
              </Button>
            );
          },
          size: 300,
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const adminId = (row.original as any).id; // Maybe fix???

            const { mutate: removeAdmin, isPending } = useRemoveAdmin();

            const handleRemoveAdmin = () => {
              removeAdmin({ adminId });
            };

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={
                      !!tokenData?.adminId && tokenData?.adminId === adminId
                    }
                    variant="sort"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={isPending}
                    onClick={handleRemoveAdmin}
                    className="!text-red-500 cursor-pointer"
                  >
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]}
    />
  );
};

export default AdminTable;
