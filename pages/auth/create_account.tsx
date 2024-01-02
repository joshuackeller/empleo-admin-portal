import { PageComponent } from "../_app";
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
import useCreateAccount from "@/src/requests/auth/useCreateAccount";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/src/components/shadcn/use-toast";

const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

const CreateAccount: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: createAccount, isPending, isSuccess } = useCreateAccount();

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createAccount(
      { body: values },
      {
        onError: (error) => {
          toast({
            variant: "destructive",
            title: (error as any)?.response?.data || "Unknown Error",
            description: "If that doesn't sound right, please contact support.",
          });
        },
      }
    );
  };
  return (
    <>
      <div className="absolute top-5 right-5">
        <Link
          className={cn(buttonVariants({ variant: "link" }))}
          href="/auth/sign_in"
        >
          Sign In
        </Link>
      </div>
      <div className="max-w-xs w-full space-y-3 m-5">
        <div>
          <h3>Create Account</h3>
          <div className="muted-text">Create an account to get started</div>
        </div>
        {isSuccess ? (
          <div>account created successfully</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Bob" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Sacamano" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="bob@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

CreateAccount.layout = "auth";

export default CreateAccount;
