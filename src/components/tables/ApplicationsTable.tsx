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
import { UsePaginatedQueryResult } from "@/src/requests/usePaginatedQuery";
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
//     accessorKey: "phone",
//     header: "Phone",
//     size: 200,
//   },
//   {
//     accessorKey: "user.email",
//     header: "Email",
//     size: 200,
//   },
//   {
//     accessorKey: "status",
//     header: "Application Status",
//     size: 200,
//     cell: ({ row }) => {
//       switch (row.original.status) {
//         case "in_review":
//           return "In Review";
//         case "new":
//           return "New";
//         case "rejected":
//           return "Rejected";
//         case "interview":
//           return "Interview";
//         case "offer_pending":
//           return "Offer Pending";
//         case "offer_accepted":
//           return "Offer Accepted";
//         case "offer_rejected":
//           return "Offer Rejected";
//         default:
//           return row.original.status;
//       }
//     },
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

//     },
//   },
// ];

interface ApplicationsTableProps {
  query: UsePaginatedQueryResult;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  listingId: string;
}

const ApplicationsTable = ({
  query,
  onSort,
  listingId,
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
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button variant="sort" onClick={() => handleSort("phone")}>
            Phone
            {selectedColumn === "phone" ? (
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
      accessorKey: "user.email",
      header: ({ column }) => {
        return (
          <Button variant="sort" onClick={() => handleSort("user.email")}>
            Email
            {selectedColumn === "user.email" ? (
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
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button variant="sort" onClick={() => handleSort("status")}>
            Application Status
            {selectedColumn === "status" ? (
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
      cell: ({ row }) => {
        switch (row.original.status) {
          case "in_review":
            return "In Review";
          case "new":
            return "New";
          case "rejected":
            return "Rejected";
          case "interview":
            return "Interview";
          case "offer_pending":
            return "Offer Pending";
          case "offer_accepted":
            return "Offer Accepted";
          case "offer_rejected":
            return "Offer Rejected";
          default:
            return row.original.status;
        }
      },
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
      },
    },
  ];

  return (
    <DataTable
      query={query}
      columns={columns}
      isClickable={isClickable}
      linkBaseRoute={`/listings/${listingId}/applications`}
    />
  );
};

export default ApplicationsTable;
