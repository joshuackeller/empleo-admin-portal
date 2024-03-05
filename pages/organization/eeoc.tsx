import React, { useEffect } from "react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import useUpdateOrganization from "@/src/requests/organizations/useUpdateOrganization";
import { z } from "zod";
import { PageComponent } from "../_app";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";
import OrganizationWrapper from "@/src/layout/wrappers/OrganizationWrapper";
import { Separator } from "@/src/components/shadcn/Separator";
import { Switch } from "@/src/components/shadcn/Switch";
import { AlertTriangleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/components/shadcn/Alert";
import { Skeleton } from "@/src/components/shadcn/Skeleton";

const formSchema = z.object({
  eeocEnabled: z.boolean(),
  veteranEnabled: z.boolean(),
  disabilityEnabled: z.boolean(),
  raceEnabled: z.boolean(),
  genderEnabled: z.boolean(),
});

const OrgPage: PageComponent = () => {
  const { data: organization } = useGetCurrentOrganization();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eeocEnabled: organization?.eeocEnabled || false,
    },
  });

  const { mutate: updateOrganization } = useUpdateOrganization(false, false);

  useEffect(() => {
    if (!!organization) {
      form.reset(organization);
    }
  }, [organization]);

  // Handle the form submission -- this will be called when the form is submitted
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (!values.eeocEnabled) {
      values.veteranEnabled = false;
      values.disabilityEnabled = false;
      values.raceEnabled = false;
      values.genderEnabled = false;
    }

    updateOrganization({
      body: values, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  if (!organization) {
    return <Skeleton className="h-64 w-full max-w-lg" />;
  }

  return (
    <OrganizationWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="space-y-3 mt-3 w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="eeocEnabled"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel>Enable EEOC Questions</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(newValue) => {
                      field.onChange(newValue);
                      handleUpdate({
                        ...form.getValues(),
                        eeocEnabled: newValue,
                      });
                    }}
                    className="ml-24 align-top"
                    // disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {organization?.eeocEnabled && (
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="veteranEnabled"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <FormLabel className="align-middle">
                      Include Veteran Status
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(newValue) => {
                          field.onChange(newValue);
                          handleUpdate({
                            ...form.getValues(),
                            veteranEnabled: newValue,
                          });
                        }}
                        className="ml-24 align-top"
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disabilityEnabled"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <FormLabel className="align-middle">
                      Include Disability Status
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(newValue) => {
                          field.onChange(newValue);
                          handleUpdate({
                            ...form.getValues(),
                            disabilityEnabled: newValue,
                          });
                        }}
                        className="ml-24 align-top"
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="raceEnabled"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <FormLabel className="align-middle">Include Race</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(newValue) => {
                          field.onChange(newValue);
                          handleUpdate({
                            ...form.getValues(),
                            raceEnabled: newValue,
                          });
                        }}
                        className="ml-24 align-top"
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genderEnabled"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <FormLabel className="align-middle">
                      Include Gender
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(newValue) => {
                          field.onChange(newValue);
                          handleUpdate({
                            ...form.getValues(),
                            genderEnabled: newValue,
                          });
                        }}
                        className="ml-24 align-top"
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
      </Form>

      <Alert className="mt-5">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          <p>
            The Equal Employment Opportunity Commission (EEOC) questions are a
            set of questions designed to gather information about an
            individual's background in the context of employment. These
            questions aim to promote diversity, equal opportunity, and fair
            treatment in the workplace.
          </p>
          <p className="!mt-2">
            These questions are NOT meant to be used in deciding which
            candidates to hire. Doing so is illegal. Consult with your
            organization's HR and legal departments before enabling these
            questions.
          </p>
          <p className="!mt-2">
            See{" "}
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href="https://www.eeoc.gov/data/eeo-data-collections#:~:text=The%20EEO%2D1%20Component%201%20report%20is%20a%20mandatory%20annual,race%20or%20ethnicity%2C%20to%20the"
            >
              eeoc.gov
            </a>{" "}
            for more details.
          </p>
        </AlertDescription>
      </Alert>
    </OrganizationWrapper>
  );
};

export default OrgPage;
