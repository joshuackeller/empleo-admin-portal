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
import {
  LegacyRef,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ListingsTable from "@/src/components/tables/ListingsTable";
import { PlusIcon, SearchIcon } from "lucide-react";
import useCreateListing from "@/src/requests/listings/useCreateListing";
import { useRouter } from "next/router";
import { EmploymentType, Listing } from "@/src/utilities/interfaces";
import useGetListings from "@/src/requests/listings/useGetListings";
import SlideSearch from "@/src/components/other/SlideSearch";

const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  employmentType: z
    .enum([
      Object.values(EmploymentType)[0],
      ...Object.values(EmploymentType).slice(1),
    ])
    .optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  published: z.boolean(),
});

const ListingsPage: PageComponent = () => {
  const router = useRouter();

  const { mutate: createListing, isPending } = useCreateListing();
  const [open, setOpen] = useState<boolean>(false);

  const query = useGetListings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: undefined,
      jobRequirements: "",
      employmentType: undefined,
      location: "",
      salaryRange: "",
      published: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createListing(
      { body: values },
      {
        onSuccess: (response: Listing) => {
          router.push(`/listings/${response.id}`);
        },
      }
    );
  };

  if (query.isError) return <div>Error</div>;

  return (
    <div>
      <div>
        <div className="flex justify-between items-start">
          <h4>Listings</h4>
          <div className="flex gap-x-2">
            <SlideSearch />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="p-1 rounded-full bg-indigo-500">
                  <PlusIcon className="h-4 w-4 text-white" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
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
                            <Input placeholder="Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
        <ListingsTable query={query} />
      </div>
    </div>
  );
};

export default ListingsPage;
