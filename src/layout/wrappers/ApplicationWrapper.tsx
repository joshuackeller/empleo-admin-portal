import { Button } from "@/src/components/shadcn/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import { Separator } from "@/src/components/shadcn/Separator";
import ApplicationQueryKeys from "@/src/requests/applications";
import useRemoveApplication from "@/src/requests/applications/useRemoveApplication";
import { cn } from "@/src/utilities/cn";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { QueryClient } from "@tanstack/react-query";
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
  const router = useRouter();
  const {
    query: { listingId, applicationId },
  } = useRouter();

  const { mutate: deleteApplication, isPending } = useRemoveApplication(
    listingId as string
  );
  const handleDeleteApplication = () => {
    deleteApplication(
      { applicationId: applicationId as string },
      {
        onSuccess: () => {
          router.push(`/listings/${listingId}/applications`);
        },
      }
    );
  };

  const isDetailsPage =
    router.pathname === "/listings/[listingId]/applications/[applicationId]";

  return (
    <div>
      <Link
        href={`/listings/${listingId}/applications`}
        className="flex items-center gap-x-2 text-xs mb-2"
      >
        <ArrowLeftIcon className="h-3 w-3" />
        <div>Back to Applicants</div>
      </Link>

      <div className="flex items-center pb-0.5">
        <h4>Applicant</h4>
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
      </div>

      <div className="flex  justify-between">
        <div className="flex items-center gap-x-5 my-2">
          <Link
            href={`/listings/${listingId}/applications/${applicationId}`}
            className={cn(
              `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
              pathname ===
                `/listings/[listingId]/applications/[applicationId]` &&
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

        {isDetailsPage && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border rounded shadow"
            >
              <DropdownMenuItem
                disabled={isPending}
                onClick={handleDeleteApplication}
                className="!text-red-500 cursor-pointer"
              >
                Delete Application
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

export default ApplicationWrapper;
