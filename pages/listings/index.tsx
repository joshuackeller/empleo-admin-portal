import { PageComponent } from "../_app";
import { Separator } from "@/src/components/shadcn/Separator";
import { Button } from "@/src/components/shadcn/Button";
import { Input } from "@/src/components/shadcn/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/shadcn/Dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";
import { useState } from "react";
import useAddListing from "@/src/requests/listings/useAddListing";
import ListingsTable from "@/src/components/tables/ListingsTable";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  employmentType: z.string().optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  published: z.boolean(),
});

const ListingsPage: PageComponent = () => {
  const { mutate: addListing, isPending } = useAddListing();
  const [open, setOpen] = useState<boolean>(false);

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
    addListing(
      { body: values },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-start">
          <h4>Listing</h4>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="p-1 rounded-full bg-indigo-500">
                  <PlusIcon className="h-4 w-4 text-white" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Listing</DialogTitle>
                  <DialogDescription
                    className="!font-sans"
                    style={{ fontFamily: "sans-serif" }}
                  ></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Write Code" {...field} />
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
                            <Input
                              placeholder="1-2 years of experience"
                              {...field}
                            />
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
                            <Input placeholder="Full Time" {...field} />
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
                            <Input placeholder="Provo, Utah" {...field} />
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
                            <Input placeholder="$85,000 - $95,000" {...field} />
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
                          <FormLabel>Published?</FormLabel>
                          <FormControl>
                            <input type="checkbox" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <div className="flex justify-end mt-3">
                      <Button disabled={isPending} type="submit">
                        Create Listing
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className="mb-3 mt-1" />
      </div>
      <div>
        <ListingsTable />
      </div>
    </div>
  );
};

export default ListingsPage;
