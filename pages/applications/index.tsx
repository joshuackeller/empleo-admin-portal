import AdminTable from "@/src/components/tables/AdminTable";
import { PageComponent } from "../_app";
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

import useAddApplication from "@/src/requests/applications/useAddApplication";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  //gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  usCitizen: z.boolean().optional(),
  workVisa: z.boolean().optional(),
  workVisaType: z.string().optional(),
  language: z.string().optional(),
  availableStartDate: z.date().optional(),
  note: z.string().optional(),
  relocate: z.boolean().optional(),
});

const ApplicationsPage: PageComponent = () => {
  const { mutate: addApplication, isPending } = useAddApplication();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      //gender: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      usCitizen: false,
      workVisa: false,
      workVisaType: "",
      language: "",
      //What does new date do?
      availableStartDate: new Date(),
      note: "",
      relocate: false,
    },
  });

  const { toast } = useToast();

  return (
    <div className="mt-3">
      <ApplicationsTable applications={applications} />
    </div>
  );
};
export default ApplicationsPage;
