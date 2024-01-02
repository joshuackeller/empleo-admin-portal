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
import useSignIn from "@/src/requests/auth/useSignIn";
import { useToast } from "@/src/components/shadcn/use-toast";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useRouter } from "next/router";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignIn: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending } = useSignIn();

  const { setAuthToken } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn(
      { body: values },
      {
        onSuccess: (response) => {
          if (!!response?.token) {
            setAuthToken(response?.token);
            router.push("/");
          } else {
            toast({
              variant: "destructive",
              title: "Unknown Error",
              description: "Please contact support",
            });
          }
        },
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
              Sign In with Email
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-0 space-y-0">
          <div>
            <Link
              className={cn(buttonVariants({ variant: "link" }), "h-5 p-0")}
              href="/auth/reset_password_request"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <Link
              className={cn(buttonVariants({ variant: "link" }), "h-5 p-0")}
              href="/auth/resend_confirmation"
            >
              Resend Confirmation?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

SignIn.layout = "auth";

export default SignIn;
