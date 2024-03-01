import { buttonVariants } from "@/src/components/shadcn/Button";
import { Separator } from "@/src/components/shadcn/Separator";
import { cn } from "@/src/utilities/cn";
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
  return (
    <div>
      <h4>Listing</h4>
      <div className="flex items-center gap-x-5 my-2">
        <Link
          href={`/listings/${listingId}`}
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === `/listings/${listingId}` && "text-primary font-bold"
          )}
        >
          Details
        </Link>
        <Link
          href={`/listings/${listingId}/fields`}
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === `/listings/${listingId}/fields` &&
              "text-primary font-bold"
          )}
        >
          Application Fields
        </Link>
        <Link
          href={`/listings/${listingId}/applications`}
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === `/listings/${listingId}/applications` &&
              "text-primary font-bold"
          )}
        >
          Applications
        </Link>
      </div>
      <Separator className="mb-2 mt-1" />
      {children}
    </div>
  );
};

export default ListingWrapper;
