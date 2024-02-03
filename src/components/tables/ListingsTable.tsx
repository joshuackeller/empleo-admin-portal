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
import useRemoveListing from "@/src/requests/listings/useRemoveListing";
import useGetListings from "@/src/requests/listings/useGetListings";
import { ColumnDef } from "@tanstack/react-table";
import { Listing } from "@/src/utilities/interfaces";
import useUpdateListing from "@/src/requests/listings/useUpdateListing";
import Link from "next/link";
import { useRouter } from "next/router";

const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "jobDescription",
    header: "Job Description",
  },
  {
    accessorKey: "jobRequirements",
    header: "Job Requirements",
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "salaryRange",
    header: "Salary Range",
  },
  {
    accessorKey: "published",
    header: "Published?",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const listingId = row.original.id;

      const { mutate: removeListing, isPending: isRemoving } =
        useRemoveListing();
      const { mutate: updateListing, isPending: isUpdating } =
        useUpdateListing();

      const handleRemoveListing = () => {
        removeListing({ listingId });
      };

      // const handleUpdateListing = () => {
      //   updateListing({ listingId });
      // };

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
                <Link href={`/listings/${listingId}`}>Update</Link>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isRemoving}
                onClick={handleRemoveListing}
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

const ListingsTable = () => {
  const { data, isFetching } = useGetListings();

  if (!data) return <Skeleton className="h-24 w-full" />;

  return <DataTable isFetching={isFetching} data={data} columns={columns} />;
};

export default ListingsTable;
