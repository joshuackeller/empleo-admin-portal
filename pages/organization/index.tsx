import React, { useEffect, useState } from "react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import useUpdateOrganization from "@/src/requests/organizations/useUpdateOrganization";
import { z } from "zod";
import { PageComponent } from "../_app";
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
import { ExternalLinkIcon, MonitorIcon } from "lucide-react";
import OrganizationWrapper from "@/src/layout/wrappers/OrganizationWrapper";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shadcn/Select";
import { Font } from "@/src/utilities/interfaces";

const formSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string().url().optional(), // Add this line for the image URL
  headerFont: z.nativeEnum(Font).optional(), // Add this line for the font
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
            // setImage(readerEvent.target.result as string);
            const dataUrlData = readerEvent.target.result as string;
            setDataUrl(dataUrlData);
            setImage(dataUrlData);
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
    borderRadius: "8px", // Rounded
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
      //headerFont: organization?.headerFont || "inter", // Set the default value to the current organization's headerFont
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

  // addState for dataUrl (Ex: const [dataUrl, setDataUrl] = useState<string | null>(null);)
  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);

  // addState for headerFont
  const [headerFont, setHeaderFont] = useState<string | undefined>(undefined);

  // Create a use effect for headerFont
  useEffect(() => {
    if (!!organization) {
      setHeaderFont(organization.headerFont || "inter"); // This pulls the headerFont from the organization
      form.setValue("headerFont", organization.headerFont || "inter"); // Set the default value to the current organization's headerFont
    }
  }, [organization]);

  // Create a use effect for headerFont -- have it update the form's default values
  useEffect(() => {
    if (headerFont === "inter" || headerFont === "notoSerif") {
      form.setValue("headerFont", headerFont as Font);
    }
  }, [headerFont]);

  // Handle the form submission
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    console.log("Updating with headerFont:", headerFont); // check the headerFont
    updateOrganization({
      body: {
        dataUrl, // Add this line for uploading image (Ex: data:image/png;base64,....)
        imageURL: image, // Pass the base64 image directly to the request
        headerFont: headerFont as Font, // Ensure headerFont is of type Font
        ...values,
      }, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  // Render the page
  return (
    <OrganizationWrapper>
      <div className="max-w-2xl flex justify-between gap-x-2 p-3 border rounded-lg mt-3">
        <div className="flex gap-x-3">
          <div className="mt-1">
            <MonitorIcon className="h-4 w-4" />
          </div>
          <div>
            <div className="small-text">Website</div>
            <div className="flex justify-between muted-text">
              View your live website.
            </div>
          </div>
        </div>
        <div>
          <Link
            href={`https://${organization?.slug}.empleo.work`}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "secondary" }), "gap-x-1")}
          >
            View <ExternalLinkIcon className="h-4 w-4 " />
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="max-w-2xl space-y-3 mt-3"
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
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LOGIC: If the user uploads an image, it will display the image they uploaded. */}
          {/* If they don't hit save and they refresh the page, it will pull the one from S3 if it exists */}
          <div style={boxStyle}>
            {dataUrl ? (
              <img src={dataUrl} alt="Uploaded" style={imageStyle} />
            ) : organization?.logo?.url ? (
              <img src={organization.logo.url} style={imageStyle} />
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

          <FormField
            control={form.control}
            name="headerFont"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary/Header Font</FormLabel>
                <FormControl>
                  {/* <div> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Select 
                      value={headerFont} 
                      onValueChange={setHeaderFont}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a Font</SelectLabel>
                          <SelectItem value="inter">San Serif</SelectItem>
                          <SelectItem value="notoSerif" className="!font-serif">Serif</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div
                      style={{
                        fontFamily: headerFont,
                        fontSize: "16px",
                        height: "25px",
                        width: "100%", // Use the same width as the input box
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        justifyContent: "left",
                        padding: "10px",
                        alignItems: "center",
                      }}
                    >
                      {headerFont ? (
                        <p>{organization?.title}</p>
                      ) : (
                        <p style={{ color: "gray" }}>No font selected</p>
                      )}
                    </div>
                  </div>
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
    </OrganizationWrapper>
  );
};

export default OrgPage;

