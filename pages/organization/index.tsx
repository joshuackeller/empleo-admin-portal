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
import { d } from "@tanstack/react-query-devtools/build/legacy/devtools-0Hr18ibL";
import { access } from "fs";

// Create a schema for the form -- this will be used to validate the form's values
const formSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string().url().optional(), 
  headerFont: z.nativeEnum(Font).optional(), 
  bodyFont: z.nativeEnum(Font).optional(), 
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
});

// Create the page component
const OrgPage: PageComponent = () => {
  // Get the current organization
  const { data: organization } = useGetCurrentOrganization();

  // IMAGE UPLOAD
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

  // Create a style for boxes
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

  // Create a style for images
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

  // addState for dataUrl (Ex: const [dataUrl, setDataUrl] = useState<string | null>(null);)
  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);

  // PRIMARY/HEADER FONT
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

  // SECONDARY/BODY FONT
  // addState for bodyFont
  const [bodyFont, setBodyFont] = useState<string | undefined>(undefined);

  // Create a use effect for bodyFont
  useEffect(() => {
    if (!!organization) {
      setBodyFont(organization.bodyFont || "inter"); // This pulls the bodyFont from the organization
      form.setValue("bodyFont", organization.bodyFont || "inter"); // Set the default value to the current organization's bodyFont
    }
  }, [organization]);

  // Create a use effect for bodyFont -- have it update the form's default values
  useEffect(() => {
    if (bodyFont === "inter" || bodyFont === "notoSerif") {
      form.setValue("bodyFont", bodyFont as Font);
    }
  }, [bodyFont]);

  // PRIMARY COLOR
  // Add state for primaryColor
  const [primaryColor, setPrimaryColor] = useState<string | undefined>(undefined);

  // Create a use effect for primaryColor
  useEffect(() => {
    if (!!organization) {
      setPrimaryColor(organization.primaryColor || ""); // This pulls the primaryColor from the organization
      form.setValue("primaryColor", organization.primaryColor || ""); // Set the default value to the current organization's primaryColor
    }
  }, [organization]);

  // Create a use effect for primaryColor -- have it update the form's default values
  useEffect(() => {
    form.setValue("primaryColor", primaryColor || "");
  }, [primaryColor]);

  // SECONDARY COLOR
  // Add state for secondaryColor
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>(undefined);

  // Create a use effect for secondaryColor
  useEffect(() => {
    if (!!organization) {
      setSecondaryColor(organization.secondaryColor || ""); // This pulls the secondaryColor from the organization
      form.setValue("secondaryColor", organization.secondaryColor || ""); // Set the default value to the current organization's secondaryColor
    }
  }, [organization]);

  // Create a use effect for secondaryColor -- have it update the form's default values
  useEffect(() => {
    form.setValue("secondaryColor", secondaryColor || "");
  }, [secondaryColor]);

  // ACCENT COLOR
  // Add state for accentColor
  const [accentColor, setAccentColor] = useState<string | undefined>(undefined);

  // Create a use effect for accentColor
  useEffect(() => {
    if (!!organization) {
      setAccentColor(organization.accentColor || ""); // This pulls the accentColor from the organization
      form.setValue("accentColor", organization.accentColor || ""); // Set the default value to the current organization's accentColor
    }
  }, [organization]);

  // Create a use effect for accentColor -- have it update the form's default values
  useEffect(() => {
    form.setValue("accentColor", accentColor || "");
  }, [accentColor]);

  // DESCRIPTION
  // Add state for description
  const [description, setDescription] = useState<string | undefined>(undefined);

  // Create a use effect for description
  useEffect(() => {
    if (!!organization) {
      setDescription(organization.description || ""); // This pulls the description from the organization
      form.setValue("description", organization.description || ""); // Set the default value to the current organization's description
    }
  }, [organization]);

  // Create a use effect for description -- have it update the form's default values
  useEffect(() => {
    form.setValue("description", description || "");
  }, [description]);

  // LONG DESCRIPTION
  // Add state for longDescription
  const [longDescription, setLongDescription] = useState<string | undefined>(undefined);

  // Create a use effect for longDescription
  useEffect(() => {
    if (!!organization) {
      setLongDescription(organization.longDescription || ""); // This pulls the longDescription from the organization
      form.setValue("longDescription", organization.longDescription || ""); // Set the default value to the current organization's longDescription
    }
  }, [organization]);

  // Create a use effect for longDescription -- have it update the form's default values
  useEffect(() => {
    form.setValue("longDescription", longDescription || "");
  }, [longDescription]);


  // PREVIEW
  // Add state for preview
  const [preview, setPreview] = useState<z.infer<typeof formSchema>>({
    title: organization?.title || "", 
    imageURL: organization?.logo?.url || "", 
    headerFont: headerFont as Font, 
    bodyFont: bodyFont as Font, 
    primaryColor: primaryColor || "", 
    secondaryColor: secondaryColor || "", 
    accentColor: accentColor || "",
    description: description || "", 
    longDescription: longDescription || "", 
  });

  // Create a use effect for preview
  useEffect(() => {
    setPreview({
      title: form.getValues("title"), 
      imageURL: image || organization?.logo?.url || "", 
      // headerFont: headerFont || "inter", 
      // bodyFont: bodyFont || "inter", 
      headerFont: headerFont as Font,
      bodyFont: bodyFont as Font,
      primaryColor: primaryColor || "", 
      secondaryColor: secondaryColor || "", 
      accentColor: accentColor || "",
      description: description || "", 
      longDescription: longDescription || "", 
    });
  }, [form.getValues(), image, headerFont, bodyFont, primaryColor, secondaryColor, description, longDescription]);

  // Add state for showPreview
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Handle the form submission -- this will be called when the form is submitted
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateOrganization({
      body: {
        dataUrl, // Add this line for uploading image (Ex: data:image/png;base64,....)
        imageURL: image, // Pass the base64 image directly to the request
        headerFont: headerFont as Font, // Ensure headerFont is of type Font
        bodyFont: bodyFont as Font, // Ensure bodyFont is of type Font
        primaryColor: primaryColor || "", // Pass the primaryColor to the request
        secondaryColor: secondaryColor || "", // Pass the secondaryColor to the request
        accentColor: accentColor || "", // Pass the accentColor to the request
        description: description || "", // Pass the description to the request
        longDescription: longDescription || "", // Pass the longDescription to the request
        ...values,
      }, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  // Render the page
  return (
    <OrganizationWrapper>
      <div className="max-w-2xl ">
        <div className="flex justify-between gap-x-2 p-3 border rounded-lg mt-3">
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
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "gap-x-1",
              )}
            >
              View <ExternalLinkIcon className="h-4 w-4 " />
            </Link>
          </div>
        </div>
        <p className="muted-text !mt-1">
          Note: If you created your organization within the last 24 hours, DNS
          records might not have had time to update. If this is the case, your
          white label website might not be ready yet.
        </p>
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

          <FormField
            control={form.control}
            name="bodyFont"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary/Body Font</FormLabel>
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
                      value={bodyFont} 
                      onValueChange={setBodyFont}
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
                        fontFamily: bodyFont,
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
                      {bodyFont ? (
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

          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <div style={{ height: "25px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(event) => setPrimaryColor(event.target.value)} 
                    />
                    <input style={{ fontSize: "14px" }}
                      type="text" 
                      value={primaryColor} 
                      readOnly 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Color</FormLabel>
                <FormControl>
                  <div style={{ height: "25px", display: "flex", gap: "10px", alignItems: "center", }}>
                    <input 
                      type="color" 
                      value={secondaryColor} 
                      onChange={(event) => setSecondaryColor(event.target.value)} 
                    />
                    <input style={{ fontSize: "14px" }}
                      type="text" 
                      value={secondaryColor} 
                      readOnly 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accentColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accent Color</FormLabel>
                <FormControl>
                  <div style={{ height: "25px", display: "flex", gap: "10px", alignItems: "center", }}>
                    <input 
                      type="color" 
                      value={accentColor} 
                      onChange={(event) => setAccentColor(event.target.value)} 
                    />
                    <input style={{ fontSize: "14px" }}
                      type="text" 
                      value={accentColor} 
                      readOnly 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Description</FormLabel>
                <FormControl>
                  <Input placeholder="We make the best widgets in the world" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long Organization Description</FormLabel>
                <FormControl>
                  <div>
                    <textarea style={{ ...boxStyle, paddingLeft: '10px', paddingTop: '5px', fontSize: '14px'}}
                      placeholder="Our company values are..." 
                      rows={5} // Set the number of rows
                      {...field}
                    />
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button 
              variant="secondary" 
              onClick={(event) => {
                event.preventDefault();
                setShowPreview(true);
              }}
            >
              Preview
              <ExternalLinkIcon className="h-4 w-4" style={{ marginLeft: '4px' }} />
            </Button>

            {showPreview && (
              <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  fontFamily: preview.bodyFont, 
                  color: 'black',
                  backgroundColor: preview.secondaryColor,
                  position: 'relative', 
                  width: '80%', 
                  maxHeight: '80%', 
                  // overflow: 'scroll',
                  // overflow: 'auto',
                  // overflowY: 'scroll',
                  // overflowX: 'hidden',
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderRadius: '10px',
                }}>
                {/* Button for the x in the top right corner */}
                <button 
                  onClick={() => setShowPreview(false)} 
                  style={{ 
                    position: 'absolute', 
                    top: '0px', 
                    right: '0px', 
                    background: 'white', 
                    border: '1px solid black', 
                    borderRadius: '50%', 
                    fontSize: '1em', 
                    cursor: 'pointer', 
                    color: 'black', 
                    width: '20px', 
                    height: '20px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '0',
                  }}
                >
                  &times;
                </button>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  // justifyContent: 'flex-start',
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: `3px solid ${preview.primaryColor}`,
                  // backgroundColor: 'white'
                }}>
                  <img src={preview.imageURL} alt="Logo" style={{ height: '50px' }} />

                  <div style={{ 
                    background: preview.accentColor,  // Use the accent color for the background
                    borderRadius: '5px', 
                    fontSize: '1em', 
                    color: 'white', 
                    padding: '10px 20px',
                    cursor: 'pointer'
                  }}>
                    View Jobs
                  </div>

                </div>

                <div style={{
                  width: '100%',
                  backgroundColor: preview.primaryColor,
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '30px',
                  paddingBottom: '20px',
                  height: '100px',
                  overflow: 'hidden',
                }}>
                  <div><h1 style={{ fontFamily: preview.headerFont }}>{preview.title}</h1></div>
                  <div><p style={{ fontFamily: preview.bodyFont }}>{preview.description}</p></div>
                </div>

                {/* <div style={{ marginTop: '10px' }}> */}
                <div style={{ marginTop: '10px', paddingBottom: '50px' }}>
                  <h3 style={{ textAlign: 'center', fontFamily: preview.headerFont }}>About Us</h3>
                  {preview.longDescription?.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      <span style={{ display: 'block', fontFamily: preview.bodyFont }}>
                        {line}
                      </span>
                    </React.Fragment>

                  ))}
                </div>

                <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: preview.accentColor, 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    borderRadius: '0 0 10px 10px',
                  }}>
                </div>

                </div>
              </div>
            )}
          </div>

          <Button className="!mt-2" disabled={isPending} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </OrganizationWrapper>
  );
};

export default OrgPage;

