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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn/Tooltip";
import { CircleDashed, HelpCircleIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .max(22)
    .refine((value) => /^[a-z0-9-]+$/.test(value), {
      message:
        "Subdomain can only contain lowercase letters, numbers, and dashes",
    }),
});

const CreateAccount: PageComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Dunder Mifflin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-x-1 mb-1">
                      Subdomain
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger disabled className="cursor-default">
                            <HelpCircleIcon className="h-3.5 w-3.5 " />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-sm">
                              Create a unique subdomain for your white label job
                              board. Subdomains can only have lowercase letters,
                              numbers, and dashes.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        onChange={(e) =>
                          form.setValue(
                            "slug",
                            e.target.value
                              ?.replace(/[^a-zA-Z0-9-]/g, "")
                              ?.toLowerCase()
                          )
                        }
                        placeholder="dunder-mifflin"
                        maxLength={22}
                      />
                      <div className="absolute top-0 right-0 bg-gray-100 border dark:bg-gray-800 text-gray-500 dark:text-gray-300 h-full w-[105px] flex items-center rounded-r-lg overflow-hidden z-10">
                        <div className="ml-1 text-sm">.empleo.work</div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && (
                <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
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
