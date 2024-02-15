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
import { ChromePicker } from "react-color";
import { Textarea } from "@/src/components/shadcn/Textarea";

// const formSchema = z.object({
//   title: z.string().min(1),
//   imageURL: z.string().url().optional(),
//   imageURLBanner: z.string().url().optional(),
//   headerFont: z.nativeEnum(Font).optional(),
//   bodyFont: z.nativeEnum(Font).optional(),
//   primaryColor: z.string().optional(),
//   secondaryColor: z.string().optional(),
//   accentColor: z.string().optional(),
//   description: z.string().optional(),
//   longDescription: z.string().optional(),
// });

const formSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string().url().optional(),
  imageURLBanner: z.string().url().optional(),
  headerFont: z.nativeEnum(Font).optional(),
  bodyFont: z.nativeEnum(Font).optional(),
  primaryColor: z.string().nullable().optional(),
  secondaryColor: z.string().nullable().optional(),
  accentColor: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  longDescription: z.string().nullable().optional(),
});

const OrgPage: PageComponent = () => {
  const { data: organization } = useGetCurrentOrganization();

  const [image, setImage] = useState<string | null>(null);

  const [banner, setBanner] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedFileTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          if (readerEvent.target) {
            const dataUrlData = readerEvent.target.result as string;
            setDataUrl(dataUrlData);
            setImage(dataUrlData);
          }
        };

        reader.readAsDataURL(file);
      } else {
        alert("Invalid file type. Please upload a valid image file.");
      }
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bannerFile = e.target.files?.[0];

    if (bannerFile) {
      const allowedBannerFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedBannerFileTypes.includes(bannerFile.type)) {
        const bannerReader = new FileReader();

        bannerReader.onload = (bannerReaderEvent) => {
          if (bannerReaderEvent.target) {
            const dataUrlBannerData = bannerReaderEvent.target.result as string;
            setDataUrlBanner(dataUrlBannerData);
            setBanner(dataUrlBannerData);
          }
        };

        bannerReader.readAsDataURL(bannerFile);
      } else {
        alert("Invalid file type. Please upload a valid image file.");
      }
    }
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: organization?.title,
    },
  });

  const { mutate: updateOrganization, isPending } = useUpdateOrganization();

  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);

  const [dataUrlBanner, setDataUrlBanner] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!!organization) {
      form.reset(organization);
    }
  }, [organization]);

  // useEffect(() => {
  //   if (!!organization) {
  //     form.reset({
  //       ...organization,
  //       primaryColor: organization.primaryColor || undefined,
  //       secondaryColor: organization.secondaryColor || undefined,
  //       accentColor: organization.accentColor || undefined,
  //       description: organization.description || undefined,
  //       longDescription: organization.longDescription || undefined,
  //     });
  //   }
  // }, [organization]);

  // Handle the form submission -- this will be called when the form is submitted
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateOrganization({
      body: {
        dataUrl, // Add this line for uploading image (Ex: data:image/png;base64,....)
        imageURL: image, // Pass the base64 image directly to the request
        dataUrlBanner,
        imageURLBanner: banner,
        headerFont: form.getValues("headerFont") as Font,
        bodyFont: form.getValues("headerFont") as Font,
        ...values,
        primaryColor: values.primaryColor || null || undefined,
        secondaryColor: values.secondaryColor || null || undefined,
        accentColor: values.accentColor || null || undefined,
        description: values.description || null || undefined,
        longDescription: values.longDescription || null || undefined,
      }, // Pass the form values to the request
      organizationId: organization?.id || "", // Pass the organization ID to the request
    });
  };

  const [displayPrimaryColorPicker, setDisplayPrimaryColorPicker] = useState(false);
  const [displaySecondaryColorPicker, setDisplaySecondaryColorPicker] = useState(false);
  const [displayAccentColorPicker, setDisplayAccentColorPicker] = useState(false);

  const handlePrimaryColorClick = () => {
    setDisplayPrimaryColorPicker(!displayPrimaryColorPicker);
  };
  
  const handlePrimaryClose = () => {
    setDisplayPrimaryColorPicker(false);
  };

  const handleSecondaryColorClick = () => {
    setDisplaySecondaryColorPicker(!displaySecondaryColorPicker);
  };

  const handleSecondaryClose = () => {
    setDisplaySecondaryColorPicker(false);
  };

  const handleAccentColorClick = () => {
    setDisplayAccentColorPicker(!displayAccentColorPicker);
  };

  const handleAccentClose = () => {
    setDisplayAccentColorPicker(false);
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
                "gap-x-1"
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
          <div className="w-full h-[200px] border rounded overflow-hidden relative flex justify-center items-center shadow">
            {dataUrl ? (
              <img
                src={dataUrl}
                alt="Uploaded"
                className="max-w-full max-h-full object-contain"
              />
            ) : organization?.logo?.url ? (
              <img
                src={organization.logo.url}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="h-full bg-transparent flex justify-center items-center">
                Organization Logo
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="imageURLBanner" // Add this line for the image URL
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Banner</FormLabel>
                <FormControl>
                  <Input
                    id="banner"
                    type="file"
                    onChange={handleBannerChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full h-[200px] border rounded overflow-hidden relative flex justify-center items-center shadow">
            {dataUrlBanner ? (
              <img
                src={dataUrlBanner}
                alt="Uploaded"
                className="max-w-full max-h-full object-contain"
              />
            ) : organization?.banner?.url ? (
              <img
                src={organization.banner.url}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="h-full bg-transparent flex justify-center items-center">
                Organization Banner
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
                  <div className="flex items-center gap-2">
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue("headerFont", value as Font)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a Font</SelectLabel>
                          <SelectItem value="inter">San Serif</SelectItem>
                          <SelectItem value="notoSerif" className="!font-serif">
                            Serif
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="h-[25px] w-full overflow-hidden relative flex justify-start p-3 items-center">
                      {field.value === Font.notoSerif ? (
                        <p className="font-serif"> {organization?.title}</p>
                      ) : field.value === Font.inter ? (
                        <p className="font-sans"> {organization?.title}</p>
                      ) : (
                        <p className="text-gray-500">No font selected</p>
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
                  <div className="flex items-center gap-2">
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue("bodyFont", value as Font)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a Font</SelectLabel>
                          <SelectItem value="inter">San Serif</SelectItem>
                          <SelectItem value="notoSerif" className="!font-serif">
                            Serif
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="h-[25px] w-full overflow-hidden relative flex justify-start p-3 items-center">
                      {field.value === Font.notoSerif ? (
                        <p className="font-serif"> {organization?.title}</p>
                      ) : field.value === Font.inter ? (
                        <p className="font-sans"> {organization?.title}</p>
                      ) : (
                        <p className="text-gray-500">No font selected</p>
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
                  <div className="h-6 flex items-center gap-2">
                    <div 
                      style={{ backgroundColor: field.value || undefined }}
                      className="w-9 h-5 border border-black rounded cursor-pointer"
                      onClick={handlePrimaryColorClick}
                    />

                    {displayPrimaryColorPicker ? <div className="absolute z-10">

                    <div className="fixed inset-0"
                      onClick={handlePrimaryClose}
                    />

                    <ChromePicker
                      color={field.value || "#ffffff"}
                      onChange={(updatedColor) => {
                        if (updatedColor && updatedColor.hex) {
                          form.setValue("primaryColor", updatedColor.hex);
                        }
                      }}
                    />
                    </div> : null}

                    <input
                      className="text-[14px]"
                      type="text"
                      value={field.value  || undefined}
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
                   <div className="h-6 flex items-center gap-2">
                   <div 
                      style={{ backgroundColor: field.value || undefined }}
                      className="w-9 h-5 border border-black rounded cursor-pointer"
                      onClick={handleSecondaryColorClick}
                    />

                    {displaySecondaryColorPicker ? <div className="absolute z-10">

                    <div className="fixed inset-0"
                      onClick={handleSecondaryClose}
                    />

                    <ChromePicker
                      color={field.value || "#ffffff"}
                      onChange={(updatedColor) => {
                        if (updatedColor && updatedColor.hex) {
                          form.setValue("secondaryColor", updatedColor.hex);
                        }
                      }}
                    />
                    </div> : null}

                    <input
                      className="text-[14px]"
                      type="text"
                      value={field.value || undefined}
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
                  <div className="h-6 flex items-center gap-2">
                    <div 
                      style={{ backgroundColor: field.value || undefined }}
                      className="w-9 h-5 border border-black rounded cursor-pointer"
                      onClick={handleAccentColorClick}
                    />

                    {displayAccentColorPicker ? <div className="absolute z-10">

                    <div className="fixed inset-0"
                      onClick={handleAccentClose}
                    />

                    <ChromePicker
                      color={field.value || "#ffffff"}
                      onChange={(updatedColor) => {
                        if (updatedColor && updatedColor.hex) {
                          form.setValue("accentColor", updatedColor.hex);
                        }
                      }}
                    />
                    </div> : null}

                    <input
                      className="text-[14px]"
                      type="text"
                      value={field.value || undefined}
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
                  <Input
                    placeholder="We make the best widgets in the world"
                    {...field}
                    value={field.value || ''}
                  />
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
                    <Textarea
                      placeholder="Our company values are..."
                      rows={5} // Set the number of rows
                      {...field}
                      value={field.value || ''}
                    />
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
