import { DataTable } from "@/src/components/shadcn/DataTable";
import { Button } from "../shadcn/Button";
import useRemoveListing from "@/src/requests/listings/useRemoveListing";
import { ColumnDef } from "@tanstack/react-table";
import { Listing } from "@/src/utilities/interfaces";
import { UsePaginatedQueryResult } from "@/src/requests/usePaginatedQuery";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type ListingsTableProps = {
  query: UsePaginatedQueryResult;
  onSort?: (column: string, direction: "asc" | "desc") => void;
};

const ListingsTable = ({ query, onSort }: ListingsTableProps) => {
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
      header: () => {
        return (
          <Button variant="sort" onClick={() => handleSort("jobTitle")}>
            Job Title
            {selectedColumn === "jobTitle" ? (
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
    // {
    //   accessorKey: "shortDescription",
    //   header: () => {
    //     return (
    //       <Button variant="sort" onClick={() => handleSort("shortDescription")}>
    //         Short Description
    //         {selectedColumn === "shortDescription" ? (
    //           sortDirection === "asc" ? (
    //             <ArrowUp className="ml-2 h-3 w-3" />
    //           ) : (
    //             <ArrowDown className="ml-2 h-3 w-3" />
    //           )
    //         ) : (
    //           <ArrowUpDown className="ml-2 h-3 w-3" />
    //         )}
    //       </Button>
    //     );
    //   },
    //   size: 300,
    // },
    {
      accessorKey: "_count.applications",
      header: () => {
        return (
          <Button
            variant="sort"
            onClick={() => handleSort("_count.applications")}
          >
            Applicants
            {selectedColumn === "_count.applications" ? (
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
      size: 100,
    },
    {
      accessorKey: "employmentType",
      header: () => {
        return (
          <Button variant="sort" onClick={() => handleSort("employmentType")}>
            Employment Type
            {selectedColumn === "employmentType" ? (
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
      size: 150,
      cell: ({ row }) => {
        switch (row.original.employmentType) {
          case "full_time":
            return "Full Time";
          case "part_time":
            return "Part Time";
          case "contract":
            return "Contract";
          case "temporary":
            return "Temporary";
          case "internship":
            return "Internship";
          case "seasonal":
            return "Seasonal";
          default:
            return row.original.employmentType;
        }
      },
    },
    {
      accessorKey: "location",
      header: () => {
        return (
          <Button variant="sort" onClick={() => handleSort("location")}>
            Location
            {selectedColumn === "location" ? (
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
      size: 150,
    },

    {
      accessorKey: "published",
      header: () => {
        return (
          <Button variant="sort" onClick={() => handleSort("published")}>
            Published?
            {selectedColumn === "published" ? (
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
      size: 150,
    },
    {
      id: "actions",
      enablePinning: true,
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
            <Button
              variant="sort"
              className="h-8 w-8 p-0 text-indigo-500"
              disabled={isRemoving}
              onClick={() =>
                (window.location.href = `/listings/${listingId}/applications/`)
              }
            >
              View Applicants
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable query={query} columns={columns} isClickable={isClickable} />
  );
};

export default ListingsTable;
