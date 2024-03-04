import { useRouter } from "next/router";
import { PageComponent } from "../../_app";
import { Button } from "@/src/components/shadcn/Button";
import { Switch } from "@/src/components/shadcn/Switch";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/src/components/shadcn/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUpdateListing from "@/src/requests/listings/useUpdateListing";
import { useState, useEffect } from "react";
import { Input } from "@/src/components/shadcn/Input";
import useGetListing from "@/src/requests/listings/useGetListing";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import { Textarea } from "@/src/components/shadcn/Textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  linkedInUrl: z.string().url().optional(),
  note: z.string().optional(),
  resume: z.any().optional(),
  coverLetter: z.any().optional(),
  availableStartDate: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  usAuthorized: z.boolean().optional(),
  eeocVeteranStatus: z.string().optional(),
  eeocDisabilityStatus: z.string().optional(),
  eeocRace: z.string().optional(),
  eeocGender: z.string().optional(),
});

const ApplicationFieldsPage: PageComponent = () => {
  const { data: organization } = useGetCurrentOrganization();

  const eeocFieldMapping = {
    eeocVeteranStatus: "veteranEnabled",
    eeocDisabilityStatus: "disabilityEnabled",
    eeocRace: "raceEnabled",
    eeocGender: "genderEnabled",
  };

  const [checkedFields, setCheckedFields] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (organization) {
      const initialCheckedFields = Object.keys(formSchema.shape).reduce(
        (acc, curr) => {
          // If the field starts with 'eeoc', check the organization's EEOC settings
          if (curr.startsWith("eeoc")) {
            const orgField =
              eeocFieldMapping[curr as keyof typeof eeocFieldMapping];
            return {
              ...acc,
              [curr]: organization[orgField as keyof typeof organization],
            };
          }
          // If the field is 'firstName' or 'lastName', default to true
          if (curr === "firstName" || curr === "lastName") {
            return { ...acc, [curr]: true };
          }
          // Otherwise, default to false
          return { ...acc, [curr]: false };
        },
        {}
      );
      setCheckedFields(initialCheckedFields);
    }
  }, [organization]);

  const handleCheck = (field: string) => {
    setCheckedFields((prevCheckedFields) => ({
      ...prevCheckedFields,
      [field]: !prevCheckedFields[field],
    }));
  };

  const totalChecked = Object.values(checkedFields).filter(Boolean).length;

  const fields = Object.keys(formSchema.shape).map((field) => ({
    include: checkedFields[field] || false,
    fieldName: field,
  }));

  const toReadableFormat = (str: string) => {
    let result = str.replace(/([A-Z])/g, " $1");
    result = result.charAt(0).toUpperCase() + result.slice(1);

    if (result.includes("Eeoc")) {
      result = result.replace("Eeoc", "EEOC");
    }

    if (result.includes("Linked In Url")) {
      result = result.replace("Linked In Url", "LinkedIn URL");
    }

    if (result.includes("Us")) {
      result = result.replace("Us", "US");
    }

    return result;
  };

  const getTooltipMessage = (fieldName: string) => {
    if (fieldName.startsWith("eeoc")) {
      return "The EEOC values can't be changed here. Please go to Organization page and click the EEOC tab to change these values.";
    } else if (fieldName === "firstName" || fieldName === "lastName") {
      return "This is a required field.";
    }
    return "";
  };

  return (
    <ListingWrapper>
      <Table>
        <TableCaption>Application Fields</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Include?</TableHead>
            <TableHead>Application Field Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => {
            return (
              <TableRow key={field.fieldName}>
                <TableCell>
                  <div className="flex items-center">
                    {field.fieldName === "firstName" ||
                    field.fieldName === "lastName" ||
                    field.fieldName.startsWith("eeoc") ? (
                      <Checkbox
                        checked={field.include}
                        onChange={() => handleCheck(field.fieldName)}
                        className="ml-4"
                        disabled={
                          field.fieldName === "firstName" ||
                          field.fieldName === "lastName" ||
                          field.fieldName.startsWith("eeoc")
                        }
                      />
                    ) : (
                      <Checkbox className="ml-4" />
                    )}
                    {(field.fieldName.startsWith("eeoc") ||
                      field.fieldName === "firstName" ||
                      field.fieldName === "lastName") && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Lock size="16" className="ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p
                              style={{
                                maxWidth: "300px",
                                wordWrap: "break-word",
                              }}
                            >
                              {getTooltipMessage(field.fieldName)}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {toReadableFormat(field.fieldName)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Application Fields Being Used</TableCell>
            <TableCell className="text-right">{totalChecked}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ListingWrapper>
  );
};

export default ApplicationFieldsPage;
