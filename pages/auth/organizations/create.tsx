import { PageComponent } from "../../_app";
import { Input } from "@/src/components/shadcn/Input";
import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";

import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useRouter } from "next/router";
import useCreateOrganization from "@/src/requests/organizations/useCreateOrganization";

const formSchema = z.object({
  title: z.string().min(1),
});

const CreateAccount: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: createOrganization, isPending } = useCreateOrganization();

  const { selectOrganization } = useAuthContext();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createOrganization(
      { body: values },
      {
        onSuccess: (response) => {
          selectOrganization(response.id);
          router.push("/");
        },
      }
    );
  };
  return (
    <>
      <div className="absolute top-5 right-5">
        <Link
          className={cn(buttonVariants({ variant: "link" }))}
          href="/auth/organizations"
        >
          Select Organization
        </Link>
      </div>
      <div className="max-w-xs w-full space-y-3 m-5">
        <div>
          <h3>Create Organization</h3>
          <div className="muted-text">
            Create an organization to get started
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Vandelay Industries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Organization
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

CreateAccount.layout = "auth";

export default CreateAccount;
