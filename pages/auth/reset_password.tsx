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
import useResetPassword from "@/src/requests/auth/useResetPassword";
import { useQueryParam } from "@/src/utilities/useQueryParam";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const ResetPassword: PageComponent = () => {
  const email = useQueryParam("email");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    form.setValue("email", email);
  }, [email]);

  const { mutate: resetPassword } = useResetPassword();

  const token = useQueryParam("token");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { password } = values;
    resetPassword({
      body: {
        token,
        password,
      },
    });
  }
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
          <h3>Reset Password</h3>
          <div className="muted-text">Enter a new password</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
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
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

ResetPassword.layout = "auth";

export default ResetPassword;
