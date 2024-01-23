import { PageComponent } from "../_app";
import { Button } from "@/src/components/shadcn/Button";
import SettingsLayout from "@/src/layout/SettingsLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetSelf from "@/src/requests/self/useGetSelf";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";
import { Input } from "@/src/components/shadcn/Input";
import useUpdateSelf from "@/src/requests/self/useUpdateSelf";
import { Separator } from "@/src/components/shadcn/Separator";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
});

const MyAccountPage: PageComponent = () => {
  const { data: self } = useGetSelf();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: self?.firstName,
      lastName: self?.lastName,
    },
  });

  useEffect(() => {
    if (!!self) {
      form.setValue("firstName", self.firstName || "");
      form.setValue("lastName", self.lastName || "");
    }
  }, [self]);

  const { mutate: updateSelf, isPending } = useUpdateSelf();

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateSelf({
      body: values,
    });
  };

  return (
    <div>
      <h4>Account Details</h4>
      <Separator className="mb-2 mt-1" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="max-w-2xl space-y-1"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Art" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Vandelay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="!mt-2" disabled={isPending} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyAccountPage;
