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
import { useEffect, useState } from "react";
import ReadJWTData from "@/src/utilities/ReadJWTData";
import { CircleDashed } from "lucide-react";

const formSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8),
});

const ResetPassword: PageComponent = () => {
  const token = useQueryParam("token");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !!token) {
      const data = ReadJWTData(token);
      if (!!data.email) {
        form.setValue("email", data.email);
      } else {
        setError(true);
      }
    }
  }, [token]);

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

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
        {error ? (
          <>
            <div>
              <h3>Something went wrong...</h3>
              <div className="muted-text">
                Looks like something's wrong with the link you have. Submit a
                request to get a new link.
              </div>
            </div>
            <Link
              className={cn(buttonVariants({}), "w-full")}
              href="/auth/reset_password_request"
            >
              Request New Link
            </Link>
          </>
        ) : isSuccess ? (
          <>
            <div>
              <h3>Password Reset!</h3>
              <div className="muted-text">Continue to sign in</div>
            </div>
            <Link
              className={cn(buttonVariants({}), "w-full")}
              href="/auth/sign_in"
            >
              Go to Sign In
            </Link>
          </>
        ) : (
          <>
            <div>
              <h3>Reset Password</h3>
              <div className="muted-text">Enter a new password</div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  disabled
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Reset Password
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

ResetPassword.layout = "auth";

export default ResetPassword;
