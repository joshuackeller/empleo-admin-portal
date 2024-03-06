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
import { useEffect } from "react";
import { Input } from "@/src/components/shadcn/Input";
import { Switch } from "@/src/components/shadcn/Switch";
import useGetListing from "@/src/requests/listings/useGetListing";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import { Textarea } from "@/src/components/shadcn/Textarea";
import { MonitorIcon } from "lucide-react";
import Link from "next/link";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { cn } from "@/src/utilities/cn";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  shortDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  employmentType: z.string().optional(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: listing?.jobTitle || "",
      jobDescription: listing?.jobDescription || "",
      shortDescription: listing?.shortDescription || "",
      jobRequirements: listing?.jobRequirements || "",
      employmentType: listing?.employmentType || "",
      location: listing?.location || "",
      salaryRange: listing?.salaryRange || "",
      published: listing?.published || false,
    },
  });

  useEffect(() => {
    if (listing) {
      form.reset({
        jobTitle: listing?.jobTitle || "",
        jobDescription: listing?.jobDescription || "",
        shortDescription: listing?.shortDescription || "",
        jobRequirements: listing?.jobRequirements || "",
        employmentType: listing?.employmentType || "",
        location: listing?.location || "",
        salaryRange: listing?.salaryRange || "",
        published: listing?.published || false,
      });
    }
  }, [listing]);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateListing({ body: values, listingId: listingId as string });
    //router.replace("/listings");
  };

  return (
    <ListingWrapper>
      {isLoading ? (
        <div className="space-y-5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <div className="max-w-2xl">
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
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Requirements</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
