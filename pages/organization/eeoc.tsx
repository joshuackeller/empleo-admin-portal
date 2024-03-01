import React, { useEffect, useState } from "react";
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
import { Font } from "@/src/utilities/interfaces";
import { Separator } from "@/src/components/shadcn/Separator";
import { Switch } from "@/src/components/shadcn/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import { Info } from "lucide-react";

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

  const { mutate: updateOrganization, isPending } = useUpdateOrganization();

  useEffect(() => {
    if (!!organization) {
      form.reset(organization);
    }
  }, [organization]);

  // Handle the form submission -- this will be called when the form is submitted
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateOrganization({
      body: {
        title: organization?.title || "",
        headerFont: organization?.headerFont || Font.inter,
        bodyFont: organization?.bodyFont || Font.inter,
        ...values,
      }, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  return (
    <OrganizationWrapper>
      <div className="flex items-center space-x-2">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="max-w-2xl space-y-3 mt-3"
            >
              <FormField
                control={form.control}
                name="eeocEnabled"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="align-middle">
                        Enable EEOC Questions
                      </FormLabel>
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
                          className="ml-2 align-top"
                        />
                      </FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={18} className="ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p
                              style={{
                                maxWidth: "300px",
                                wordWrap: "break-word",
                              }}
                            >
                              The Equal Employment Opportunity Commission (EEOC)
                              questions are a set of questions designed to
                              gather information about an individual's
                              background in the context of employment. These
                              questions aim to promote diversity, equal
                              opportunity, and fair treatment in the workplace.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />

              {organization?.eeocEnabled && (
                <>
                  <FormField
                    control={form.control}
                    name="veteranEnabled"
                    render={({ field }) => (
                      <FormItem>
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
                            className="ml-2 align-top"
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
                      <FormItem>
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
                            className="ml-2 align-top"
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
                      <FormItem>
                        <FormLabel className="align-middle">
                          Include Race
                        </FormLabel>
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
                            className="ml-2 align-top"
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
                      <FormItem>
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
                            className="ml-2 align-top"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>
      </div>
    </OrganizationWrapper>
  );
};

export default OrgPage;
