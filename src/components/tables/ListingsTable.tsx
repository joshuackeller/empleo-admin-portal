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

const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    size: 200,
  },
  {
    accessorKey: "shortDescription",
    header: "Short Description",
    size: 300,
  },
  {
    accessorKey: "_count.applications",
    header: "Applicants",
    size: 100,
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
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
    header: "Location",
    size: 150,
  },
  // {
  //   accessorKey: "salaryRange",
  //   header: "Salary Range",
  //   size: 200,
  // },
  {
    accessorKey: "published",
    header: "Published?",
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
          <Button
            variant="ghost"
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

type ListingsTableProps = {
  data: Listing[];
};

const ListingsTable: React.FC<ListingsTableProps> = ({ data }) => {
  const { isFetching } = useGetListings();
  const isClickable = true;

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
