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
import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";

// const columns: ColumnDef<Application>[] = [
//   {
//     accessorKey: "firstName",
//     header: "First Name",
//     size: 200,
//   },
//   {
//     accessorKey: "lastName",
//     header: "Last Name",
//     size: 200,
//   },
//   {
//     accessorKey: "address",
//     header: "Street Address",
//     size: 300,
//   },
//   {
//     accessorKey: "phone",
//     header: "phone",
//     size: 200,
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const applicationId = row.original.id;

//       const { mutate: removeApplication, isPending: isRemoving } =
//         useRemoveApplication();
//       const { mutate: updateApplication, isPending: isUpdating } =
//         useUpdateApplication();

//       const handleRemoveApplication = () => {
//         removeApplication({ applicationId });
//       };

//       return (
//         <div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <DotsHorizontalIcon className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel
//                 //className="!text-red-500 cursor-pointer"
//                 asChild
//               >
//                 <Link href={`/applications/${applicationId}`}>Update</Link>
//               </DropdownMenuLabel>

//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 disabled={isRemoving}
//                 onClick={handleRemoveApplication}
//                 className="!text-red-500 cursor-pointer"
//               >
//                 Remove
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       );
//     },
//   },
// ];

interface ApplicationsTableProps {
  applications: Application[] | undefined;
  isFetching: boolean;
  listingId: string;
  onSort?: (columnName: string, direction: "asc" | "desc") => void;
}

const ApplicationsTable = ({
  applications,
  isFetching,
  listingId,
  onSort,
}: ApplicationsTableProps) => {
  const isClickable = true;

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

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("firstName")}>
            First Name
            {selectedColumn === "firstName" ? (
              sortDirection === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <Button variant="ghost" onClick={() => handleSort("lastName")}>
            Last Name
            {selectedColumn === "lastName" ? (
              sortDirection === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 200,
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("address")}>
            Street Address
            {selectedColumn === "address" ? (
              sortDirection === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 300,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("phone")}>
            Phone
            {selectedColumn === "phone" ? (
              sortDirection === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 200,
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
