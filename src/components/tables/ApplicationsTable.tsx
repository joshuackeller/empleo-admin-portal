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
import useGetApplication from "@/src/requests/applications/useGetApplication";
import { ColumnDef } from "@tanstack/react-table";
import { Application } from "@/src/utilities/interfaces";
import useUpdateApplication from "@/src/requests/applications/useUpdateApplication";
import Link from "next/link";
import useGetApplications from "@/src/requests/applications/useGetApplications";
import useRemoveApplication from "@/src/requests/applications/useRemoveApplication";
import { useRouter } from "next/router";

const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    header: "Street Address",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const applicationId = row.original.id;

      const { mutate: removeApplication, isPending: isRemoving } =
        useRemoveApplication();
      const { mutate: updateApplication, isPending: isUpdating } =
        useUpdateApplication();

      const handleRemoveApplication = () => {
        removeApplication({ applicationId });
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel
                //className="!text-red-500 cursor-pointer"
                asChild
              >
                <Link href={`/applications/${applicationId}`}>Update</Link>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isRemoving}
                onClick={handleRemoveApplication}
                className="!text-red-500 cursor-pointer"
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

interface ApplicationsTableProps {
  applications: Application[] | undefined;
  isFetching: boolean;
  listingId: string;
}

const ApplicationsTable = ({
  applications,
  isFetching,
  listingId,
}: ApplicationsTableProps) => {
  const isClickable = true;

  if (!applications) return <Skeleton className="h-24 w-full" />;
  return (
    <DataTable
      isFetching={isFetching}
      data={applications}
      columns={columns}
      isClickable={isClickable}
      linkBaseRoute={`/listings/${listingId}/applications`}
    />
  );
};

export default ApplicationsTable;