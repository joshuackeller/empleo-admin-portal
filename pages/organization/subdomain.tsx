import React, { useEffect, useState } from "react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { Button } from "@/src/components/shadcn/Button";
import { PageComponent } from "../_app";
import { Input } from "@/src/components/shadcn/Input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import {
  AlertTriangleIcon,
  CircleDashedIcon,
  HelpCircleIcon,
} from "lucide-react";
import OrganizationWrapper from "@/src/layout/wrappers/OrganizationWrapper";
import useUpdateOrganizationSlug from "@/src/requests/organizations/useUpdateOrganizationSlug";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/components/shadcn/Alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/shadcn/AlertDialog";

const OrgPage: PageComponent = () => {
  const { data: organization } = useGetCurrentOrganization();
  const currentOrgDetails = JSON.parse(JSON.stringify(organization || {}));
  const [slug, setSlug] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const [updateOpen, setUpdateOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!!organization) {
      setSlug(organization.slug || "");
    }
  }, [organization]);

  const { mutate: updateOrganizationSlug, isPending } =
    useUpdateOrganizationSlug();

  const handleUpdate = () => {
    updateOrganizationSlug({
      body: {
        slug,
      },
      organizationId: organization?.id || "",
    });
  };

  return (
    <>
      <OrganizationWrapper>
        <div className="max-w-2xl my-3">
          <div className="flex items-center gap-x-1 mb-1">
            <label
              htmlFor="slug"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subdomain
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger disabled className="cursor-default">
                  <HelpCircleIcon className="h-3.5 w-3.5 " />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Create a unique subdomain for you white label job board.
                    Subdomains can only have lowercase letters, numbers, and
                    dashes.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      ?.replace(/[^a-zA-Z0-9-]/g, "")
                      ?.toLowerCase(),
                  )
                }
                placeholder="dunder-mifflin"
                maxLength={22}
              />
              <div className="absolute top-0 right-0 bg-gray-100 border dark:bg-gray-800 text-gray-500 dark:text-gray-300 h-full w-28 flex items-center rounded-r-lg overflow-hidden z-10">
                <div className="ml-1 text-sm">.empleo.work</div>
              </div>
            </div>
            <Alert>
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                Changing your subdomain can cause up to 24 hours of downtime as
                DNS records update.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <Button
          disabled={isPending || currentOrgDetails?.slug === slug}
          onClick={() => setUpdateOpen(true)}
          className="gap-x-1"
        >
          Update{" "}
          {isPending && (
            <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </OrganizationWrapper>
      <AlertDialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              DNS records can take a long time to update. While most of the time
              your website will update within a few minutes, changing your
              domain can sometimes cause up to 24 hours of downtime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrgPage;
// <div className="flex items-center gap-x-2 !-mt-5">
//     <a
//         href={`https://${organization?.slug}.empleo.work`}
//         target="_blank"
//         rel="noreferrer"
//         className="small-text flex items-center gap-x-1 !mt-1 whitespace-nowrap"
//     >
//         View Preview{" "}
//         <ExternalLinkIcon className="h-3.5 w-3.5" />
//     </a>
//     <p className="muted-text">
//         Warning: Updating the subdomain can cause several
//         minutes of downtime as DNS records update.
//     </p>
// </div>
