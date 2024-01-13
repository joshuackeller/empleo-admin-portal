import AdminTable from "@/src/components/tables/AdminTable";
import { PageComponent } from "./_app";
import { Separator } from "@/src/components/shadcn/Separator";
import { Button } from "@/src/components/shadcn/Button";
import { Input } from "@/src/components/shadcn/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/shadcn/Dialog";
import useAddAdmin from "@/src/requests/admins/useAddAdmin";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/src/components/shadcn/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

const TeamPage: PageComponent = () => {
  const { mutate: addAdmin, isPending } = useAddAdmin();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addAdmin(
      { body: values },
      {
        onError: (error) => {
          // toast({
          //   variant: "destructive",
          //   title: (error as any)?.response?.data || "Unknown Error",
          //   description: "If that doesn't sound right, please contact support.",
          // });
        },
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3>Team</h3>
          <div className="!font-sans">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  Add Admin <PlusCircledIcon />
                </Button>
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
        <Separator />
      </div>
      <div className="mt-3">
        <AdminTable />
      </div>
    </div>
  );
};

export default TeamPage;
