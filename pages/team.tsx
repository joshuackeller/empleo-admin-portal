import AdminTable from "@/src/components/tables/AdminTable";
import { PageComponent } from "./_app";
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
import useAddAdmin from "@/src/requests/admins/useAddAdmin";
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
import { useState, useEffect, use } from "react";
import { Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/shadcn/Pagination";
import useGetAdmins from "@/src/requests/admins/useGetAdmins";

const formSchema = z.object({
  email: z.string().email(),
});

const TeamPage: PageComponent = () => {
  const { mutate: addAdmin, isPending } = useAddAdmin();
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("5"); // This is the number of rows to show per page
  const { data, isLoading, isError } = useGetAdmins({ page, pageSize });
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
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addAdmin(
      { body: values },
      {
        onSuccess: () => {
          setOpen(false);
          form.setValue("email", "");
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
          <h4>Team</h4>
          <div className="!font-sans">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="p-1 rounded-full bg-indigo-500">
                  <Plus className="h-4 w-4 text-white" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Admin</DialogTitle>
                  <DialogDescription
                    className="!font-sans"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Enter the email of the person you would like to add as an
                    admin.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="art@vandelayindustries.com"
                              {...field}
                            />
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
        <AdminTable data={data?.slice(startIndex, endIndex)} />
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

export default TeamPage;
