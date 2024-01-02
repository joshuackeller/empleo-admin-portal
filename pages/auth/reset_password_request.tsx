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
import useResetPasswordRequest from "@/src/requests/auth/useResetPasswordRequest";
import { useToast } from "@/src/components/shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email(),
});

const ResetPasswordRequest: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: resetPasswordRequest, isPending } = useResetPasswordRequest();
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPasswordRequest(
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
          <div className="muted-text">
            Request a link to reset your password
          </div>
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
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Get Link
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

ResetPasswordRequest.layout = "auth";

export default ResetPasswordRequest;
