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
  FormMessage,
} from "@/src/components/shadcn/Form";

import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignIn: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="absolute top-5 right-5">
        <Link
          className={cn(buttonVariants({ variant: "link" }))}
          href="/auth/create_account"
        >
          Create Account
        </Link>
      </div>
      <div className="max-w-xs w-full space-y-3 m-5">
        <div>
          <h3>Sign In</h3>
          <div className="muted-text">Sign in with your email and password</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In with Email
            </Button>
          </form>
        </Form>
        <Link
          className={cn(buttonVariants({ variant: "link" }), "p-0")}
          href="/auth/reset_password_request"
        >
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

SignIn.layout = "auth";

export default SignIn;
