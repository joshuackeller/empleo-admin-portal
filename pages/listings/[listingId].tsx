import { useRouter } from "next/router";
import { PageComponent } from "../_app";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@/src/components/shadcn/Button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { DialogHeader } from "@/src/components/shadcn/Dialog";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/src/components/shadcn/Form";
import ListingsTable from "@/src/components/tables/ListingsTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUpdateListing from "@/src/requests/listings/useUpdateListing";
import { useState } from "react";
import { Input } from "@/src/components/shadcn/Input";
import { Checkbox } from "@/src/components/shadcn/Checkbox";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  employmentType: z.string().optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  published: z.boolean(),
});

const ListingPage: PageComponent = () => {
  //line below to auto fill with listing values.
  //const {data: listing} = useGetLis
  const { mutate: updateListing, isPending } = useUpdateListing();
  const [open, setOpen] = useState<boolean>(false);
  const {
    query: { listingId },
  } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      jobRequirements: "",
      employmentType: "",
      location: "",
      salaryRange: "",
      published: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateListing(
      { body: values, listingId: listingId as string },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div>
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms2" disabled />
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Published?
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-3">
            <Button disabled={isPending} type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ListingPage;

//  <FormField
// control={form.control}
// name="jobDescription"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Job Description</FormLabel>
//     <FormControl>
//       {/* <Input placeholder="Write Code" {...field} /> */}
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
// <FormField
// control={form.control}
// name="jobRequirements"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Job Requirements</FormLabel>
//     <FormControl>
//       {/* <Input */}
//       {/* placeholder="1-2 years of experience" */}
//       {/* {...field} */}
//       {/* /> */}
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
// <FormField
// control={form.control}
// name="employmentType"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Employment Type</FormLabel>
//     <FormControl>
//       {/* <Input placeholder="Full Time" {...field} /> */}
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
// <FormField
// control={form.control}
// name="location"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Location</FormLabel>
//     <FormControl>
//       {/* <Input placeholder="Provo, Utah" {...field} /> */}
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
// <FormField
// control={form.control}
// name="salaryRange"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Salary Range</FormLabel>
//     <FormControl>
//       {/* <Input placeholder="$85,000 - $95,000" {...field} /> */}
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
// <FormField
// control={form.control}
// name="published"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Published?</FormLabel>
//     <FormControl>
//       <input type="checkbox" />
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
