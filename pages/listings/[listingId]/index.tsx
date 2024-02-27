import { useRouter } from "next/router";
import { PageComponent } from "../../_app";
import { Button } from "@/src/components/shadcn/Button";
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
import { Textarea } from "@/src/components/shadcn/Textare";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  employmentType: z.string().optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  published: z.boolean().default(false),
});

const ListingPage: PageComponent = () => {
  const router = useRouter();
  const listingId = router.query.listingId;

  const { data: listing, isLoading } = useGetListing(listingId as string);
  const { mutate: updateListing, isPending } = useUpdateListing();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: listing?.jobTitle || "",
      jobDescription: listing?.jobDescription || "",
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

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <ListingWrapper>
      <div>
        <div></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="flex items-center space-y-0.5 mt-3">
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

            <div className="flex justify-start mt-3 mb-4">
              <Button
                variant={"outline"}
                disabled={isPending}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/listings");
                }}
              >
                Back to Listings
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ListingWrapper>
  );
};

export default ListingPage;
