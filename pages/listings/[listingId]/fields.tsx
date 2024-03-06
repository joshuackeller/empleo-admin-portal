import { PageComponent } from "../../_app";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/shadcn/Table";
import { Checkbox } from "@/src/components/shadcn/Checkbox";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import useGetListing from "@/src/requests/listings/useGetListing";
import { useRouter } from "next/router";
import { Listing, Organization } from "@/src/utilities/interfaces";
import Link from "next/link";
import useUpdateListing from "@/src/requests/listings/useUpdateListing";
import { cn } from "@/src/utilities/cn";

const ApplicationFieldsPage: PageComponent = () => {
  const {
    query: { listingId },
  } = useRouter();
  const { data: organization, isLoading: isLoadingOrg } =
    useGetCurrentOrganization();
  const { data: listing, isLoading: isLoadingListing } = useGetListing(
    listingId as string
  );

  const isLoading = isLoadingOrg || isLoadingListing;

  const { mutate: updateListing } = useUpdateListing({
    listingId: listingId as string,
    showToast: false,
    optimistic: true,
  });

  return (
    <ListingWrapper>
      <Table className="max-w-2xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Include?</TableHead>
            <TableHead>Field Name on Application</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FIELDS.map((field) => {
            return (
              <TableRow
                key={field.displayName}
                className={cn(isLoading && "bg-gray-100 animate-pulse")}
              >
                <TableCell>
                  <div className="flex items-center">
                    <Checkbox
                      checked={
                        field.required
                          ? true
                          : field.eeoc
                            ? !!organization?.[
                                field.fieldName as keyof Organization
                              ] || false
                            : !!listing?.[field.fieldName as keyof Listing] ||
                              false
                      }
                      onCheckedChange={(val) => {
                        if (!field.eeoc && !field.required) {
                          updateListing({
                            body: {
                              [field.fieldName as keyof Listing]: val,
                            },
                            listingId: listingId as string,
                          });
                        }
                      }}
                      className="ml-4"
                      disabled={isLoading || field.eeoc || field.required}
                    />
                    {(field.eeoc || field.required) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Lock size="16" className="ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {field.eeoc ? (
                              <p>
                                The EEOC values can't be changed here. Please go <br />
                                to the Organization page and click the EEOC tab to <br />
                                change these values.
                              </p>
                            ) : (
                              field.required && <p>This is a required field.</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                {field.eeoc ? (
                  <TableCell className="font-medium">
                    <Link href="/organization/eeoc" className="hover:underline">
                      {field.displayName}
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell className="font-medium">
                    {field.displayName}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Application Fields Being Used</TableCell>
            <TableCell className="text-right">{totalChecked}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </ListingWrapper>
  );
};

export default ApplicationFieldsPage;

const FIELDS = [
  {
    fieldName: "firstName",
    displayName: "First Name",
    required: true,
    eeoc: false,
  },
  {
    fieldName: "lastName",
    displayName: "Last Name",
    required: true,
    eeoc: false,
  },
  {
    fieldName: "linkedInUrlEnabled",
    displayName: "LinkedIn Url",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "noteEnabled",
    displayName: "Feel free to add anything else we should know!",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "resumeEnabled",
    displayName: "Resume",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "coverLetterEnabled",
    displayName: "Cover Letter",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "availableStartDateEnabled",
    displayName: "Available Start Date",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "phoneEnabled",
    displayName: "Phone",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "addressEnabled",
    displayName: "Address",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "cityEnabled",
    displayName: "City",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "stateEnabled",
    displayName: "State",
    required: false,
    eeoc: false,
  },
  { fieldName: "zipEnabled", displayName: "Zip", required: false, eeoc: false },
  {
    fieldName: "usAuthorizedEnabled",
    displayName: "Authorized to work in US?",
    required: false,
    eeoc: false,
  },
  {
    fieldName: "veteranEnabled",
    displayName: "EEOC Veteran",
    required: false,
    eeoc: true,
  },
  {
    fieldName: "disabilityEnabled",
    displayName: "EEOC Disability Enabled",
    required: false,
    eeoc: true,
  },
  {
    fieldName: "raceEnabled",
    displayName: "EEOC Race",
    required: false,
    eeoc: true,
  },
  {
    fieldName: "genderEnabled",
    displayName: "EEOC Gender",
    required: false,
    eeoc: true,
  },
];
