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
import {
  ExternalLinkIcon,
  Heading5,
  Info,
  MonitorIcon,
  AlertTriangleIcon,
  CircleDashedIcon,
  HelpCircleIcon,
} from "lucide-react";
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
import Editor from "@/src/components/textEditor/Editor";
import { Label } from "@/src/components/shadcn/Label";
import { Skeleton } from "@/src/components/shadcn/Skeleton";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";

const formSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string().url().optional(),
  headerFont: z.nativeEnum(Font).optional(),
  bodyFont: z.nativeEnum(Font).optional(),
  primaryColor: z.string().nullable().optional(),
  secondaryColor: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  longDescription: z.string().nullable().optional(),
});

const OrgPage: PageComponent = () => {
  const { data: organization } = useGetCurrentOrganization();

  const { mutate: updateOrganization, isPending } = useUpdateOrganization();

  const [image, setImage] = useState<string | null>(null);
  const [longDescription, setLongDescription] = useState<string | undefined>(
    undefined
  );

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: organization?.title,
    },
  });

  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!!organization) {
      setLongDescription(organization?.longDescription || "");
      form.reset(organization);
    }
  }, [organization]);

  const handleUpdate = () => {
    updateOrganization({
      body: {
        imageURL: image,
        ...form.getValues(),
        dataUrl,
        longDescription: longDescription || undefined,
      },
      organizationId: organization?.id || "",
    });
  };

  const [displayPrimaryColorPicker, setDisplayPrimaryColorPicker] =
    useState(false);
  const [displaySecondaryColorPicker, setDisplaySecondaryColorPicker] =
    useState(false);

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
                <FormLabel className="flex items-center">
                  Organization Logo
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">Organization Logo</h4>
                        <br />
                        Add a logo or picture that will be displayed on the
                        front page of your white-label site.
                        <br />
                        <br />
                        Here is an example white-label page for a fictional
                        company, Dunder Mifflin
                        <img
                          className="w-auto h-auto mt-2 border border-black"
                          src="/popupPictures/organizationLogoPopup.jpg"
                          alt="Organization Logo"
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
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
            name="headerFont"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Primary/Header Font
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">Primary/Header Font</h4>
                        <br />
                        Change the font of the Header that will be displayed on
                        the front page of your white-label site.
                        <br />
                        <br />
                        Here is an example white-label page for a fictional
                        company, Dunder Mifflin
                        <img
                          className="w-auto h-auto mt-2 border border-black"
                          src="/popupPictures/primaryHeaderFontPopup.jpg"
                          alt="Organization Logo"
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
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
                <FormLabel className="flex items-center">
                  Secondary/Body Font
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">Secondary/Body Font</h4>
                        <br />
                        Change the font of any Body text that will be shown on
                        your white-label site.
                        <br />
                        <br />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
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
                <FormLabel className="flex items-center">
                  Primary Color
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">Primary Color</h4>
                        <br />
                        Change the color of the various buttons found throughout
                        your white-label site.
                        <br />
                        <br />
                        Here is an example white-label page for a fictional
                        company, Dunder Mifflin
                        <img
                          className="w-auto h-auto mt-2 border border-black"
                          src="/popupPictures/primaryColorPopup.jpg"
                          alt="Organization Logo"
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className="h-6 flex items-center gap-2">
                    <div
                      style={{ backgroundColor: field.value || undefined }}
                      className="w-9 h-5 border border-black rounded cursor-pointer"
                      onClick={() =>
                        setDisplayPrimaryColorPicker(!displayPrimaryColorPicker)
                      }
                    />

                    {displayPrimaryColorPicker ? (
                      <div className="absolute z-10">
                        <div
                          className="fixed inset-0"
                          onClick={() => {
                            setDisplayPrimaryColorPicker(false);
                          }}
                        />

                        <ChromePicker
                          color={field.value || "#ffffff"}
                          onChange={(updatedColor) => {
                            if (updatedColor && updatedColor.hex) {
                              form.setValue("primaryColor", updatedColor.hex);
                            }
                          }}
                        />
                      </div>
                    ) : null}

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
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Secondary Color
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">Secondary Color</h4>
                        <br />
                        Change the slight accent color that is shown in the
                        background of your white-label site.
                        <br />
                        <br />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className="h-6 flex items-center gap-2">
                    <div
                      style={{ backgroundColor: field.value || undefined }}
                      className="w-9 h-5 border border-black rounded cursor-pointer"
                      onClick={() =>
                        setDisplaySecondaryColorPicker(
                          !displaySecondaryColorPicker
                        )
                      }
                    />

                    {displaySecondaryColorPicker ? (
                      <div className="absolute z-10">
                        <div
                          className="fixed inset-0"
                          onClick={() => setDisplaySecondaryColorPicker(false)}
                        />

                        <ChromePicker
                          color={field.value || "#ffffff"}
                          onChange={(updatedColor) => {
                            if (updatedColor && updatedColor.hex) {
                              form.setValue("secondaryColor", updatedColor.hex);
                            }
                          }}
                        />
                      </div>
                    ) : null}

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
                <FormLabel className="flex items-center">
                  Organization Description
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger disabled className="cursor-default">
                        <HelpCircleIcon size="16" className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          padding: "1em",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          zIndex: 1000,
                        }}
                      >
                        <h4 className="text-center">
                          Organization Description
                        </h4>
                        <br />
                        Enter a description, motto, or slogan that will be
                        displayed under your company name on the front page of
                        your white-label site.
                        <br />
                        <br />
                        Here is an example white-label page for a fictional
                        company, Dunder Mifflin
                        <img
                          className="w-auto h-auto mt-2 border border-black"
                          src="/popupPictures/organizationDescriptionPopup.jpg"
                          alt="Organization Logo"
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="We make the best widgets in the world"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-2.5">
        {typeof longDescription === "undefined" ? (
          <Skeleton className="h-36 w-full" />
        ) : (
          <>
            <Label className="flex items-center pb-0.5">
              Long Organization Description
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger disabled className="cursor-default">
                    <HelpCircleIcon size="16" className="ml-1" />
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      padding: "1em",
                      maxWidth: "500px",
                      wordWrap: "break-word",
                      zIndex: 1000,
                    }}
                  >
                    <h4 className="text-center">
                      Long Organization Description
                    </h4>
                    <br />
                    Write a longer description that will be displayed as the
                    body of your white-label site. Add images, embed videos, and
                    utilize the text editor to make your site stand out and
                    showcase your company.
                    <br />
                    <br />
                    Here is an example white-label page for a fictional company,
                    Dunder Mifflin.
                    <img
                      className="w-auto h-auto mt-2 border border-black"
                      src="/popupPictures/longDescriptionPopup.jpg"
                      alt="Organization Logo"
                    />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Editor
              value={longDescription}
              setValue={setLongDescription}
              placeholder="Write something cool about your company here and it will be displayed on your custom job board!"
            />
          </>
        )}
      </div>

      <Button className="!mt-3" disabled={isPending} onClick={handleUpdate}>
        Update
      </Button>
    </OrganizationWrapper>
  );
};

export default OrgPage;

// const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const bannerFile = e.target.files?.[0];

//   if (bannerFile) {
//     const allowedBannerFileTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedBannerFileTypes.includes(bannerFile.type)) {
//       const bannerReader = new FileReader();

//       bannerReader.onload = (bannerReaderEvent) => {
//         if (bannerReaderEvent.target) {
//           const dataUrlBannerData = bannerReaderEvent.target.result as string;
//           setDataUrlBanner(dataUrlBannerData);
//           setBanner(dataUrlBannerData);
//         }
//       };

//       bannerReader.readAsDataURL(bannerFile);
//     } else {
//       alert("Invalid file type. Please upload a valid image file.");
//     }
//   }
// };

// const [dataUrlBanner, setDataUrlBanner] = useState<string | undefined>(
//   undefined
// );

// const layoutToNumber = {
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   "Layout 1": 1,
//   "Layout 2": 2,
//   "Layout 3": 3,
//   "Layout 4": 4,
//   "Layout 5": 5,
// };

// const [layout, setLayout] = useState<Layout | null>(null);
// const [selectedLayout, setSelectedLayout] = useState(organization?.layout);
// const [open, setOpen] = useState(false);
// const layoutValue = selectedLayout || organization?.layout || "one";
// const [page, setPage] = useState(layoutToNumber[layoutValue]);

// useEffect(() => {
//   setPage(layoutToNumber[layoutValue]);
// }, [layoutValue]);

// const handleClickOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
//   const layoutValue = organization?.layout || "one";
//   setPage(layoutToNumber[layoutValue]);
//   setSelectedLayout(layoutValue as Layout | undefined);
// };

// const handlePageChange = (newPage: React.SetStateAction<number>) => {
//   setPage(newPage);
//   setSelectedLayout(numberToString(newPage) as Layout);
// };

// const numberToString = (num: any) => {
//   switch (num) {
//     case 1:
//       return "one";
//     case 2:
//       return "two";
//     case 3:
//       return "three";
//     case 4:
//       return "four";
//     case 5:
//       return "five";
//     default:
//       return "one";
//   }
// };

// const mapLayoutToString = (layout: any) => {
//   switch (layout) {
//     case Layout.one:
//       return "Layout 1";
//     case Layout.two:
//       return "Layout 2";
//     case Layout.three:
//       return "Layout 3";
//     case Layout.four:
//       return "Layout 4";
//     case Layout.five:
//       return "Layout 5";
//     default:
//       return layout;
//   }
// };

// useEffect(() => {
//   if (layout) {
//     form.setValue("layout", layout);
//     setOpen(false);
//   }
// }, [layout]);

{
  /* Comment out banner for now */
}
{
  /* <FormField
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
          </div> */
}

{
  /* Comment out layout for now */
}
{
  /* <span className="flex items-center">
            <Button variant="secondary" onClick={handleClickOpen} type="button">
              Select Layout
              <MousePointerSquare className="h-4 w-4 ml-1" />
            </Button>
            <p style={{ margin: 0, marginLeft: 16 }} className="mb-5 text-sm">
              {(() => {
                if (!selectedLayout) {
                  return mapLayoutToString(organization?.layout);
                }
                switch (selectedLayout) {
                  case Layout.one:
                    return "Layout 1";
                  case Layout.two:
                    return "Layout 2";
                  case Layout.three:
                    return "Layout 3";
                  case Layout.four:
                    return "Layout 4";
                  case Layout.five:
                    return "Layout 5";
                  default:
                    return selectedLayout;
                }
              })()}
            </p>
          </span>

          {open && (
            <>
              <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  zIndex: 1000,
                  width: "90%",
                  height: "90%",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="mb-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(1)}
                    type="button"
                    style={
                      page === 1
                        ? { backgroundColor: "#1c4966", color: "#fff" }
                        : {}
                    }
                  >
                    Layout 1
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(2)}
                    type="button"
                    className="ml-10"
                    style={
                      page === 2
                        ? { backgroundColor: "#1c4966", color: "#fff" }
                        : {}
                    }
                  >
                    Layout 2
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(3)}
                    type="button"
                    className="ml-10"
                    style={
                      page === 3
                        ? { backgroundColor: "#1c4966", color: "#fff" }
                        : {}
                    }
                  >
                    Layout 3
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(4)}
                    type="button"
                    className="ml-10"
                    style={
                      page === 4
                        ? { backgroundColor: "#1c4966", color: "#fff" }
                        : {}
                    }
                  >
                    Layout 4
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(5)}
                    type="button"
                    className="ml-10"
                    style={
                      page === 5
                        ? { backgroundColor: "#1c4966", color: "#fff" }
                        : {}
                    }
                  >
                    Layout 5
                  </Button>
                </div>

                <div
                  style={{ backgroundColor: organization?.primaryColor || "" }}
                  className="w-full flex-1"
                >
                  {page === 1 && (
                    <div>
                      <div className="flex justify-between items-center p-2">
                        <img
                          src={organization?.logo?.url}
                          alt="Organization Logo"
                          className="w-12 h-12"
                        />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mr-4"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            About
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            Job Listings
                          </Button>
                        </div>
                      </div>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <div className="relative">
                        <img
                          src={organization?.banner?.url}
                          alt="Organization Banner"
                          className="w-full h-48 object-cover"
                        />
                        <header
                          className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-white mx-auto"`}
                        >
                          <h1>{organization?.title}</h1>
                          <p style={{ marginTop: "4px" }}>
                            {organization?.description}
                          </p>
                        </header>
                      </div>

                      <Separator
                        className="w-full mt-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <main className="container mx-auto mt-4 text-center">
                        <section>
                          <h2
                            className={`text-2xl font-bold text-${organization?.bodyFont}`}
                          >
                            Current Job Openings
                          </h2>
                          <Button
                            className="!mt-2"
                            style={{
                              backgroundColor:
                                organization?.secondaryColor || "",
                            }}
                            type="button"
                          >
                            View All Job Listings
                          </Button>
                        </section>
                      </main>
                      <footer
                        className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
                      >
                        <p className={`text-sm`}>
                          &copy; {new Date().getFullYear()}{" "}
                          {organization?.title}. All rights reserved.
                        </p>
                      </footer>
                    </div>
                  )}

                  {page === 2 && (
                    <div>
                      <div>
                        <div className="relative flex justify-between items-center p-2">
                          <img
                            src={organization?.logo?.url}
                            alt="Organization Logo"
                            className="w-12 h-12"
                          />
                          <div
                            className="absolute inset-0 flex justify-center items-center"
                            style={{ pointerEvents: "none" }}
                          >
                            <h1
                              className={`text-${organization?.bodyFont}`}
                              style={{ pointerEvents: "auto" }}
                            >
                              {organization?.title}
                            </h1>
                          </div>
                          <div>
                            <Button
                              type="button"
                              variant="outline"
                              className="mr-4"
                              style={{
                                borderColor:
                                  organization?.accentColor || undefined,
                              }}
                            >
                              About
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              style={{
                                borderColor:
                                  organization?.accentColor || undefined,
                              }}
                            >
                              Job Listings
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <div className="relative">
                        <img
                          src={organization?.banner?.url}
                          alt="Organization Banner"
                          className="w-full h-48 object-cover"
                        />
                        <header
                          className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-white mx-auto`}
                        >
                          <h4 style={{ marginTop: "4px" }}>
                            {organization?.description}
                          </h4>
                        </header>
                      </div>

                      <Separator
                        className="w-full mt-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <main className="container mx-auto mt-4 text-center">
                        <section>
                          <h2
                            className={`text-2xl font-bold text-${organization?.bodyFont}`}
                          >
                            Current Job Openings
                          </h2>
                          <Button
                            className="!mt-2"
                            style={{
                              backgroundColor:
                                organization?.secondaryColor || "",
                            }}
                            type="button"
                          >
                            View All Job Listings
                          </Button>
                        </section>
                      </main>
                      <footer
                        className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
                      >
                        <p className={`text-sm`}>
                          &copy; {new Date().getFullYear()}{" "}
                          {organization?.title}. All rights reserved.
                        </p>
                      </footer>
                    </div>
                  )}

                  {page === 3 && (
                    <div>
                      <div className="flex justify-between items-center p-2">
                        <img
                          src={organization?.logo?.url}
                          alt="Organization Logo"
                          className="w-12 h-12"
                        />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mr-4"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            About
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            Job Listings
                          </Button>
                        </div>
                      </div>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <header className="text-center">
                        <h1 className="mb-0">{organization?.title}</h1>
                        <p style={{ marginTop: "4px" }}>
                          {organization?.description}
                        </p>
                      </header>

                      <section className="flex flex-col items-center justify-center mt-16">
                        <h2
                          className={`text-2xl font-bold text-${organization?.bodyFont}`}
                        >
                          Current Job Openings
                        </h2>
                        <Button
                          className="!mt-2"
                          style={{
                            backgroundColor: organization?.secondaryColor || "",
                          }}
                          type="button"
                        >
                          View All Job Listings
                        </Button>
                      </section>
                      <footer
                        className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
                      >
                        <p className={`text-sm`}>
                          &copy; {new Date().getFullYear()}{" "}
                          {organization?.title}. All rights reserved.
                        </p>
                      </footer>
                    </div>
                  )}

                  {page === 4 && (
                    <div>
                      <div className="flex justify-between items-center p-2">
                        <img
                          src={organization?.logo?.url}
                          alt="Organization Logo"
                          className="w-12 h-12"
                        />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mr-4"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            About
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            Job Listings
                          </Button>
                        </div>
                      </div>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <div className="relative">
                        <img
                          src={organization?.banner?.url}
                          alt="Organization Banner"
                          className="w-full h-48 object-cover"
                        />
                        <header
                          className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center`}
                          style={{ color: "black", margin: "auto" }}
                        >
                          <h1>{organization?.title}</h1>
                        </header>
                      </div>

                      <Separator
                        className="w-full mt-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <main className="container mx-auto mt-1 text-center">
                        <section>
                          <p style={{ marginTop: "4px" }}>
                            "{organization?.description}"
                          </p>

                          <h2
                            className={`mt-10 text-2xl font-bold text-${organization?.bodyFont}`}
                          >
                            Current Job Openings
                          </h2>
                          <Button
                            className="!mt-2"
                            style={{
                              backgroundColor:
                                organization?.secondaryColor || "",
                            }}
                            type="button"
                          >
                            View All Job Listings
                          </Button>
                        </section>
                      </main>
                      <footer
                        className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
                      >
                        <p className={`text-sm`}>
                          &copy; {new Date().getFullYear()}{" "}
                          {organization?.title}. All rights reserved.
                        </p>
                      </footer>
                    </div>
                  )}

                  {page === 5 && (
                    <div>
                      <div className="flex justify-between items-center p-2">
                        <img
                          src={organization?.logo?.url}
                          alt="Organization Logo"
                          className="w-12 h-12"
                        />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mr-4"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            About
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            style={{
                              borderColor:
                                organization?.accentColor || undefined,
                            }}
                          >
                            Job Listings
                          </Button>
                        </div>
                      </div>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <header
                        style={{ color: "white" }}
                        className="text-center mb-8 mt-8"
                      >
                        <h1 className="mb-0">{organization?.title}</h1>
                        <p style={{ marginTop: "4px" }}>
                          {organization?.description}
                        </p>
                      </header>

                      <Separator
                        className="w-full mb-2"
                        style={{
                          backgroundColor: organization?.accentColor || "",
                        }}
                      />

                      <section className="flex flex-col items-center justify-center mt-4">
                        <h2
                          className={`text-2xl font-bold text-${organization?.bodyFont}`}
                        >
                          Current Job Openings
                        </h2>
                        <Button
                          className="!mt-2"
                          style={{
                            backgroundColor: organization?.secondaryColor || "",
                          }}
                          type="button"
                        >
                          View All Job Listings
                        </Button>
                      </section>
                      <footer
                        className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
                      >
                        <p className={`text-sm`}>
                          &copy; {new Date().getFullYear()}{" "}
                          {organization?.title}. All rights reserved.
                        </p>
                      </footer>
                    </div>
                  )}
                </div>
                <div
                  className="mt-2"
                  style={{ bottom: "20px", alignSelf: "flex-start" }}
                >
                  <Button
                    style={{ backgroundColor: "#ff3b58" }}
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </Button>
                  <Button
                    style={{ backgroundColor: "#50a88b" }}
                    onClick={() => {
                      const newLayout = `Layout ${page}` as Layout | undefined;
                      if (newLayout === selectedLayout) {
                        handleClose();
                      } else {
                        setLayout(Layout[numberToString(page)]);
                        setSelectedLayout(newLayout);
                      }
                    }}
                    type="button"
                    className="ml-4"
                  >
                    Select Layout
                  </Button>
                </div>
              </div>
            </>
          )} */
}

{
  /* Comment out accent color for now */
}
{
  /* <FormField
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

                    {displayAccentColorPicker ? (
                      <div className="absolute z-10">
                        <div
                          className="fixed inset-0"
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
                      </div>
                    ) : null}

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
          /> */
}
