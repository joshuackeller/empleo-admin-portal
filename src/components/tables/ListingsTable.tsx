import { DataTable } from "@/src/components/shadcn/DataTable";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import { Button } from "../shadcn/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import useRemoveListing from "@/src/requests/listings/useRemoveListing";
import useGetListings from "@/src/requests/listings/useGetListings";
import { ColumnDef } from "@tanstack/react-table";
import { Listing } from "@/src/utilities/interfaces";
import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";

// const columns: ColumnDef<Listing>[] = [
//   {
//     accessorKey: "jobTitle",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => handleSort("jobTitle")}
//         >
//           Job Title
//           {selectedColumn === "jobTitle" ? (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />) : <ArrowUpDown className="ml-2 h-4 w-4" />}
//         </Button>
//       );
//     },
//     size: 200,
//   },
//   {
//     accessorKey: "shortDescription",
//     header: "Short Description",
//     size: 300,
//   },
//   {
//     accessorKey: "_count.applications",
//     header: "Applicants",
//     size: 100,
//   },
//   {
//     accessorKey: "employmentType",
//     header: "Employment Type",
//     size: 150,
//   },
//   {
//     accessorKey: "location",
//     header: "Location",
//     size: 150,
//   },
//   {
//     accessorKey: "salaryRange",
//     header: "Salary Range",
//     size: 200,
//   },
//   {
//     accessorKey: "published",
//     header: "Published?",
//     size: 150,
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const listingId = row.original.id;

//       const { mutate: deleteListing, isPending: isRemoving } =
//         useRemoveListing();

//       const handleRemoveListing = (e: any) => {
//         e.preventDefault();
//         e.stopPropagation();
//         deleteListing({ listingId });
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
//               <DropdownMenuItem
//                 disabled={isRemoving}
//                 onClick={handleRemoveListing}
//                 className="!text-red-500 cursor-pointer"
//               >
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       );
//     },
//   },
// ];

type ListingsTableProps = {
  data: Listing[];
  onSort?: (columnName: string, direction: "asc" | "desc") => void;
};

const ListingsTable: React.FC<ListingsTableProps> = ({ data, onSort }) => {
  const { isFetching } = useGetListings();
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

  const columns: ColumnDef<Listing>[] = [
    {
      accessorKey: "jobTitle",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("jobTitle")}>
            Job Title
            {selectedColumn === "jobTitle" ? (
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
      accessorKey: "shortDescription",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("shortDescription")}
          >
            Short Description
            {selectedColumn === "shortDescription" ? (
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
      accessorKey: "_count.applications",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("_count.applications")}
          >
            Applicants
            {selectedColumn === "_count.applications" ? (
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
      size: 100,
    },
    {
      accessorKey: "employmentType",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("employmentType")}>
            Employment Type
            {selectedColumn === "employmentType" ? (
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
      size: 150,
    },
    {
      accessorKey: "location",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("location")}>
            Location
            {selectedColumn === "location" ? (
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
      size: 150,
    },
    {
      accessorKey: "salaryRange",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("salaryRange")}>
            Salary Range
            {selectedColumn === "salaryRange" ? (
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
      accessorKey: "published",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleSort("published")}>
            Published?
            {selectedColumn === "published" ? (
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
      size: 150,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const listingId = row.original.id;

        const { mutate: deleteListing, isPending: isRemoving } =
          useRemoveListing();

        const handleRemoveListing = (e: any) => {
          e.preventDefault();
          e.stopPropagation();
          deleteListing({ listingId });
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
                <DropdownMenuItem
                  disabled={isRemoving}
                  onClick={handleRemoveListing}
                  className="!text-red-500 cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (!data) return <Skeleton className="h-24 w-full" />;

  return (
    <DataTable
      isFetching={isFetching}
      data={data}
      columns={columns}
      isClickable={isClickable}
    />
  );
};

export default ListingsTable;
