import { useRouter } from "next/router";
import { PageComponent } from "../../_app";
import { Button, buttonVariants } from "@/src/components/shadcn/Button";
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
import { useEffect, useState } from "react";
import { Input } from "@/src/components/shadcn/Input";
import { Switch } from "@/src/components/shadcn/Switch";
import useGetListing from "@/src/requests/listings/useGetListing";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import { MonitorIcon } from "lucide-react";
import Link from "next/link";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { cn } from "@/src/utilities/cn";
import { ClipboardIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Label } from "@/src/components/shadcn/Label";
import { useToast } from "@/src/components/shadcn/use-toast";
import Editor from "@/src/components/textEditor/Editor";
import { EmploymentType } from "@/src/utilities/interfaces";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "@/src/components/shadcn/Select";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  shortDescription: z.string().optional(),
  jobRequirements: z.string().optional(),

  location: z.string().optional(),
  salaryRange: z.string().optional(),
  published: z.boolean().default(false),
});

const ListingPage: PageComponent = () => {
  const router = useRouter();
  const listingId = router.query.listingId;

  const { data: organization } = useGetCurrentOrganization();

  const { data: listing, isLoading } = useGetListing(listingId as string);
  const { mutate: updateListing, isPending } = useUpdateListing();

  const [jobDescription, setJobDescription] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string | undefined>(
    undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: listing?.jobTitle || "",
      jobDescription: listing?.jobDescription || "",
      shortDescription: listing?.shortDescription || "",
      jobRequirements: listing?.jobRequirements || "",
      location: listing?.location || "",
      salaryRange: listing?.salaryRange || "",
      published: listing?.published || false,
    },
  });

  useEffect(() => {
    if (listing) {
      setJobDescription(listing?.jobDescription || "");
      setEmploymentType(listing?.employmentType || undefined);
      form.reset({
        jobTitle: listing?.jobTitle || "",
        jobDescription: listing?.jobDescription || "",
        shortDescription: listing?.shortDescription || "",
        jobRequirements: listing?.jobRequirements || "",
        location: listing?.location || "",
        salaryRange: listing?.salaryRange || "",
        published: listing?.published || false,
      });
    }
  }, [listing]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateListing({
      body: {
        ...values,
        jobDescription,
        employmentType: employmentType as EmploymentType,
      },
      listingId: listingId as string,
    });
  };

  return (
    <ListingWrapper>
      {isLoading ? (
        <div className="space-y-3.5 max-w-2xl">
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-9 w-40" />
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mb-24">
          {listing?.published && (
            <div className="flex justify-between gap-x-2 p-3 border rounded-lg mt-3 mb-3">
              <div className="flex gap-x-3">
                <div className="mt-1">
                  <MonitorIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="small-text">Job Listing</div>
                  <div className="flex justify-between muted-text">
                    View the listing on your live site.
                  </div>
                </div>
              </div>
              <div>
                <Link
                  href={`https://${organization?.slug}.empleo.work/listings/${listingId}`}
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
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2 mt-3">
                        <FormLabel>Published</FormLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        >
                          Published
                        </Switch>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label>Employment Type</Label>
                <Select
                  onValueChange={setEmploymentType}
                  defaultValue={employmentType}
                  value={employmentType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label>Job Description</Label>
                <Editor
                  value={jobDescription || listing?.jobDescription || ""}
                  setValue={setJobDescription}
                />
              </div>

              <div className="flex justify-end mt-3">
                <Button disabled={isPending} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </ListingWrapper>
  );
};

export default ListingPage;
