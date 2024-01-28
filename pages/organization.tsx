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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import { ExternalLinkIcon, HelpCircleIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .max(22)
    .refine((value) => /^[a-z0-9-]+$/.test(value), {
      message:
        "Subdomain can only contain lowercase letters, numbers, and dashes",
    }),
  imageURL: z.string().url().optional(), // Add this line for the image URL
});

const OrgPage: PageComponent = () => {
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
      form.setValue("slug", organization.slug || ""); // Set the default value to the current organization's title
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
          className="max-w-2xl space-y-3"
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-x-1 mb-1">
                    Subdomain
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger disabled className="cursor-default">
                          <HelpCircleIcon className="h-3.5 w-3.5 " />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-sm">
                            Create a unique subdomain for you white label job
                            board. Subdomains can only have lowercase letters,
                            numbers, and dashes.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormLabel>
                <FormControl>
                  <>
                    <div className="relative">
                      <Input
                        {...field}
                        onChange={(e) =>
                          form.setValue(
                            "slug",
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
                    <div className="flex items-center gap-x-2 !-mt-5">
                      <a
                        href={`https://${organization?.slug}.empleo.work`}
                        target="_blank"
                        rel="noreferrer"
                        className="small-text flex items-center gap-x-1 !mt-1 whitespace-nowrap"
                      >
                        View Preview{" "}
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                      <p className="muted-text">
                        Warning: Updating the subdomain can cause several
                        minutes of downtime as DNS records update.
                      </p>
                    </div>
                  </>
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
