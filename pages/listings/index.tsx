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
import { useState, useEffect } from "react";
import ListingsTable from "@/src/components/tables/ListingsTable";
import { PlusIcon } from "lucide-react";
import useCreateListing from "@/src/requests/listings/useCreateListing";
import { useRouter } from "next/router";
import { EmploymentType, Listing } from "@/src/utilities/interfaces";
import useGetListings from "@/src/requests/listings/useGetListings";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/shadcn/Pagination";

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

  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("4"); // This is the number of rows to show per page
  const { data, isLoading, isError } = useGetListings({ page, pageSize });
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(parseInt(pageSize));
  const rowsPerPage = parseInt(pageSize);
  const totalPages = Math.ceil((data?.length ?? 0) / rowsPerPage);

  useEffect(() => {
    setEndIndex(startIndex + rowsPerPage);
  }, [startIndex, rowsPerPage]);

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

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && endIndex < (data?.length ?? 0)) {
      const newEndIndex = Math.min(endIndex + rowsPerPage, data?.length ?? 0);
      setPage(Math.ceil(newEndIndex / rowsPerPage).toString());
      setStartIndex(endIndex);
      setEndIndex(newEndIndex);
    } else if (direction === "prev" && startIndex > 0) {
      const newStartIndex = Math.max(startIndex - rowsPerPage, 0);
      setPage(
        Math.ceil((newStartIndex + rowsPerPage) / rowsPerPage).toString()
      );
      setEndIndex(startIndex);
      setStartIndex(newStartIndex);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div>
        <div className="flex justify-between items-start">
          <h4>Listings</h4>
          <div>
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
      <div
        style={{
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ListingsTable data={data?.slice(startIndex, endIndex) ?? []} />
      </div>
      <div style={{ height: "50px", position: "relative" }}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  startIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => handlePageChange("prev")}
              />
            </PaginationItem>
            {Number(page) > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            {Number(page) < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  endIndex >= (data?.length ?? 0)
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() => handlePageChange("next")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ListingsPage;

{
  /* <FormField
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
                    /> */
}
