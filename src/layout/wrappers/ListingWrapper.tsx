import { Button } from "@/src/components/shadcn/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import { Separator } from "@/src/components/shadcn/Separator";
import useGetListing from "@/src/requests/listings/useGetListing";
import useRemoveListing from "@/src/requests/listings/useRemoveListing";
import { cn } from "@/src/utilities/cn";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ListingWrapperProps {
  children: ReactNode;
}

const ListingWrapper = ({ children }: ListingWrapperProps) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const listingId = router.query.listingId;
  const isDetailsPage = pathname === `/listings/[listingId]`;

  const { mutate: deleteListing, isPending } = useRemoveListing();
  const handleDeleteListing = () => {
    deleteListing(
      { listingId: listingId as string },
      {
        onSuccess: () => {
          router.push("/listings");
        },
      }
    );
  };
  return (
    <div>
      <h4>Listing</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-5 my-2">
          <Link
            href={`/listings/${listingId}`}
            className={cn(
              `text-sm font-medium transition-colors text-gray-400 hover:text-primary`,
              pathname === `/listings/[listingId]` && "text-primary"
            )}
          >
            Details
          </Link>
          <Link
            href={`/listings/${listingId}/fields`}
            className={cn(
              `text-sm font-medium transition-colors text-gray-400 hover:text-primary`,
              pathname === `/listings/[listingId]/fields` && "text-primary"
            )}
          >
            Fields
          </Link>
          <Link
            href={`/listings/${listingId}/applications`}
            className={cn(
              `text-sm font-medium transition-colors text-gray-400 hover:text-primary`,
              pathname === `/listings/[listingId]/applications` &&
                "text-primary"
            )}
          >
            Applicants
          </Link>
        </div>
        {isDetailsPage && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={isPending}
                onClick={handleDeleteListing}
                className="!text-red-500 cursor-pointer"
              >
                Delete Listing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Separator className="mb-2 mt-1" />
      {children}
    </div>
  );
};

export default ListingWrapper;
