import React, { useEffect, useState } from "react";
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
import { useTheme } from "next-themes";

// Create a schema for the form
const formSchema = z.object({
  title: z.string().min(1), // Only constraint is that the title must be at least 1 character long
  imageURL: z.string().url().optional(), // Add this line for the image URL
});

// Create a page component
const OrgPage: PageComponent = () => {
  // Get the current organization
  const { data: organization } = useGetCurrentOrganization();

  // Image Upload
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check if the file type is allowed (e.g., only allow image files)
      const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedFileTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          if (readerEvent.target) {
            setImage(readerEvent.target.result as string);
          }
        };

        reader.readAsDataURL(file);
      } else {
        // Display a message or handle the case where the file type is not allowed
        alert("Invalid file type. Please upload a valid image file.");
      }
    }
  };

  const boxStyle: React.CSSProperties = {
    width: "100%", // Use the same width as the input box
    height: "200px", // Fixed Height
    border: "1px solid rgba(0, 0, 110, .075)",
    borderRadius: "8px", // Add border-radius for a rounded appearance
    overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", // Add a small shadow
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

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

  return (
    <div>
      <h4>Organization</h4>

      <Separator className="mb-2 mt-1" />
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
                  <Input placeholder="Vandelay Industries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageURL" // Add this line for the image URL
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Logo</FormLabel>
                <FormControl>
                  {/* <input type="file" {...field} onChange={handleImageChange} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Move the image upload box right below the "Organization Logo" title */}
          <div style={boxStyle}>
            {image ? (
              <img src={image} alt="Uploaded" style={imageStyle} />
            ) : (
              <div
                style={{
                  height: "100%",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Company Logo
              </div>
            )}
          </div>
          {/* Move the file upload button below the image upload box */}
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              style={{ fontSize: "14px", width: "100%" }}
            />
          </div>
          <Button className="!mt-2" disabled={isPending} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrgPage;
