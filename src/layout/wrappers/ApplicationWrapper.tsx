import { Separator } from "@/src/components/shadcn/Separator";
import { cn } from "@/src/utilities/cn";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import { HelpCircleIcon } from "lucide-react";

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
        <div>Back to Applications</div>
      </Link>
      <h4 className="flex items-center pb-0.5">
        Application
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled className="cursor-default">
              <HelpCircleIcon size="16" className="ml-1" />
            </TooltipTrigger>
            <TooltipContent
              style={{
                padding: "1em",
                maxWidth: "500px",
                wordWrap: "break-word",
                zIndex: 1000,
              }}
            >
              <h4 className="text-center">Application</h4>
              <br />
              View the results of this job application and manage its status.
              The application status will help you keep track of the applicant's
              progress through the hiring process.
              <br />
              <br />
              Use the internal notes to record any additional information about
              the applicant. This information will not be shared with the
              applicant.
              <br />
              <br />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h4>
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
