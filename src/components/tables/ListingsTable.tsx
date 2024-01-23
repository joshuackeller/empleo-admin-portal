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
import useAuthContext from "@/src/utilities/useAuthContext";
import ReadJWTData from "@/src/utilities/ReadJWTData";
import { ColumnDef } from "@tanstack/react-table";
import { Listing } from "@/src/utilities/interfaces";

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
];

const ListingsTable = () => {
  const { data, isFetching } = useGetListings();

  if (!data) return <Skeleton className="h-24 w-full" />;

  return <DataTable isFetching={isFetching} data={data} columns={columns} />;
};

export default ListingsTable;
