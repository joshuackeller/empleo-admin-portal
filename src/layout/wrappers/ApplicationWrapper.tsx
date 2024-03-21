import { Separator } from "@/src/components/shadcn/Separator";
import { cn } from "@/src/utilities/cn";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ApplicationWrapperProps {
  children: ReactNode;
}

const ApplicationWrapper = ({ children }: ApplicationWrapperProps) => {
  const { pathname } = useRouter();
  const {
    query: { listingId, applicationId },
  } = useRouter();

  return (
    <div>
      <Link
        href={`/listings/${listingId}/applications`}
        className="flex items-center gap-x-2 text-xs mb-2"
      >
        <ArrowLeftIcon className="h-3 w-3" />
        <div>Back to Applicants</div>
      </Link>
      <h4>Applicants</h4>
      <div className="flex items-center gap-x-5 my-2">
        <Link
          href={`/listings/${listingId}/applications/${applicationId}`}
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === `/listings/[listingId]/applications/[applicationId]` &&
              "text-primary"
          )}
        >
          Details
        </Link>
        <Link
          href={`/listings/${listingId}/applications/${applicationId}/eeoc`}
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname ===
              `/listings/[listingId]/applications/[applicationId]/eeoc` &&
              "text-primary"
          )}
        >
          EEOC
        </Link>
      </div>
      <Separator className="mb-2 mt-1" />
      {children}
    </div>
  );
};

export default ApplicationWrapper;
