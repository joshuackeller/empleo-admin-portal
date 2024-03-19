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

type AdminTableProps = {
  query: UsePaginatedQueryResult;
};

const AdminTable = ({ query }: AdminTableProps) => {
  const { token } = useAuthContext();
  const tokenData = ReadJWTData(token || "");

  return (
    <DataTable
      query={query}
      columns={[
        {
          accessorKey: "firstName",
          header: "First Name",
          size: 200,
        },
        {
          accessorKey: "lastName",
          header: "Last Name",
          size: 200,
        },
        {
          accessorKey: "email",
          header: "Email",
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
                    variant="ghost"
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