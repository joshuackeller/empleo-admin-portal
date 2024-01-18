import React, { useEffect } from "react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { Separator } from "@/src/components/shadcn/Separator";
import { Button } from "@/src/components/shadcn/Button";
import useUpdateOrganization from "@/src/requests/organizations/useUpdateOrganization";
import { z } from "zod";
import { PageComponent } from "./_app";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/components/shadcn/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";

// Create a schema for the form
const formSchema = z.object({
  title: z.string().min(1), // Only constraint is that the title must be at least 1 character long
});

// Create a page component
const OrgPage: PageComponent = () => {
  // Get the current organization
  const { data: organization } = useGetCurrentOrganization();

  // Create a form with the schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: organization?.title, // Set the default value to the current organization's title
    },
  });

  // When the organization changes, update the form's default values
  useEffect(() => {
    if (!!organization) {
      form.setValue("title", organization.title || ""); // Set the default value to the current organization's title
    }
  }, [organization]);

  // Get the updateOrganization function from the hook
  const {
    mutate: updateOrganization,
    isPending,
    isSuccess,
  } = useUpdateOrganization();

  // Handle the form submission
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateOrganization({
      body: values, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  // Render the page
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Organization</h3>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="max-w-2xl space-y-1"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Vandalay Industries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="!mt-2" disabled={isPending} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrgPage;
