import useGetApplication from "@/src/requests/applications/useGetApplication";
import { useRouter } from "next/router";
import { Label } from "@/src/components/shadcn/Label";
import { Input } from "@/src/components/shadcn/Input";
import ApplicationWrapper from "@/src/layout/wrappers/ApplicationWrapper";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/components/shadcn/Alert";
import { AlertTriangleIcon } from "lucide-react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { useState } from "react";
import { cn } from "@/src/utilities/cn";
import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import Link from "next/link";

const SingleApplicationEEOC = () => {
  const {
    query: { applicationId },
  } = useRouter();

  const [view, setView] = useState<boolean>(false);

  const { data: application } = useGetApplication(applicationId as string);
  const { data: organization } = useGetCurrentOrganization();

  return (
    <ApplicationWrapper>
      <div className="max-w-2xl">
        {organization?.eeocEnabled ? (
          <>
            <Alert className="mt-5">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                <p className="!mt-2">
                  These questions are NOT meant to be used in deciding which
                  candidates to hire. Doing so is illegal. These numbers should
                  only be used for EEOC reporting.
                </p>
                <p className="!mt-2">
                  See{" "}
                  <a
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.eeoc.gov/data/eeo-data-collections"
                  >
                    eeoc.gov
                  </a>{" "}
                  for more details.
                </p>
              </AlertDescription>
            </Alert>
            <div className={cn("mt-3 relative")}>
              {!view && (
                <div className="absolute inset-0 flex justify-center items-center z-50">
                  <Button onClick={() => setView(true)}>View</Button>
                </div>
              )}
              <div className={cn(!view && "blur-sm")}>
                {organization?.raceEnabled && (
                  <div>
                    <Label>Race</Label>
                    <Input disabled value={GetRace(application?.eeocRace)} />
                  </div>
                )}
                {organization?.veteranEnabled && (
                  <div>
                    <Label>Veteran Status</Label>
                    <Input
                      disabled
                      value={GetVeteranStatus(application?.eeocVeteranStatus)}
                    />
                  </div>
                )}
                {organization?.disabilityEnabled && (
                  <div>
                    <Label>Disability Status</Label>
                    <Input
                      disabled
                      value={GetDisabilityStatus(
                        application?.eeocDisabilityStatus
                      )}
                    />
                  </div>
                )}
                {organization?.genderEnabled && (
                  <div>
                    <Label>Gender</Label>
                    <Input
                      disabled
                      value={GetGender(application?.eeocGender)}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between gap-x-5 p-3 border rounded-lg mt-3 mb-3">
            <div className="flex gap-x-3">
              <div className="mt-1">
                <AlertTriangleIcon className="h-4 w-4" />
              </div>
              <div>
                <div className="small-text">EEOC Not Enabled</div>
                <div className="flex justify-between muted-text leading-4 mt-1">
                  EEOC data collection has not been enabled for you
                  organization.
                </div>
              </div>
            </div>
            <div>
              <Link
                href={`/organization/eeoc`}
                className={cn(buttonVariants({}), "gap-x-1")}
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </ApplicationWrapper>
  );
};

export default SingleApplicationEEOC;

const GetRace = (race?: string | null) => {
  switch (race) {
    case "asian":
      return "Asian";
    case "black_or_african_american":
      return "Black or African American";
    case "hispanic_or_latino":
      return "Hispanic or Latino";
    case "native_american_or_alaska_native":
      return "Native American or Alaska Native";
    case "native_american_or_pacific_islander":
      return "Native Hawaiian or Other Pacific Islander";
    case "white":
      return "White";
    default:
      return "No Answer";
  }
};

const GetGender = (veteranStatus?: string | null) => {
  switch (veteranStatus) {
    case "female":
      return "Female";
    case "male":
      return "Male";
    case "other":
      return "Other";
    default:
      return "No Answer";
  }
};

const GetVeteranStatus = (disabilityStatus?: string | null) => {
  switch (disabilityStatus) {
    case "-":
      return "I choose not to disclose";
    case "protected":
      return "I identify as one or more of the classifications of protected veteran listed.";
    case "other":
      return "Other veteran";
    case "not_protected":
      return " I am not a protected veteran";
    default:
      return "No Answer";
  }
};

const GetDisabilityStatus = (disabilityStatus?: string | null) => {
  switch (disabilityStatus) {
    case "-":
      return "I choose not to disclose";
    case "disabled":
      return "Yes, I have a disability, or have had one in the past";
    case "no_disabled":
      return "No, I do not have a disability and have not had one in the past";
    default:
      return "No Answer";
  }
};
