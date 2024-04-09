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
import { useState } from "react";
import { HelpCircleIcon, Plus } from "lucide-react";
import useGetAdmins from "@/src/requests/admins/useGetAdmins";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import { useRouter } from "next/router";
import SlideSearch from "@/src/components/other/SlideSearch";

const formSchema = z.object({
  email: z.string().email(),
});

const TeamPage: PageComponent = () => {
  const { mutate: addAdmin, isPending } = useAddAdmin();
  const [open, setOpen] = useState<boolean>(false);
  const query = useGetAdmins();
  const router = useRouter();

  const handleSort = (columnName: string, direction: "asc" | "desc") => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: columnName, direction },
    });
  };

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

  return (
    <div>
      <div>
        <div className="flex justify-between items-start">
          <h4 className="flex items-center pb-0.5">
            Team
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
                  <h4 className="text-center">Admin Team</h4>
                  <br />
                  View and manage the admins of your organization.
                  <br />
                  <br />
                  Each user on this list has full access to the Empleo admin
                  portal, including creating, viewing, and updating job
                  listings, viewing applications, and changing white-label site
                  settings.
                  <br />
                  <br />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <div className="flex items-center gap-x-2">
            <SlideSearch />
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
      {/* <AdminTable query={query} /> */}
      {/* <AdminTable query={query} onSort={(columnName) => handleSort(columnName)}/> */}
      <AdminTable query={query} onSort={handleSort} />
    </div>
  );
};

export default TeamPage;
