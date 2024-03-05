import { Button } from "@/src/components/shadcn/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/shadcn/Form";
import { Input } from "@/src/components/shadcn/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shadcn/Select";
import { Textarea } from "@/src/components/shadcn/Textarea";
import useGetApplication from "@/src/requests/applications/useGetApplication";
import useUpdateApplication from "@/src/requests/applications/useUpdateApplication";
import useGetApplicationNotes from "@/src/requests/applications/useGetApplicationNotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ChevronLeft } from "lucide-react";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormEvent, useState } from "react";
import useCreateApplicationNote from "@/src/requests/applications/useCreateApplicationNote";

const formSchema = z.object({
  // applicationId: z.string(),
  status: z.string(),
  // applicationNote: z.string(),
});

type StatusKey =
  | "new"
  | "in_review"
  | "rejected"
  | "interview"
  | "offer_pending"
  | "offer_accepted"
  | "offer_rejected";

function getPrettyStatus(status: StatusKey) {
  const statusMap: Record<StatusKey, string> = {
    new: "New",
    in_review: "In Review",
    rejected: "Rejected",
    interview: "Interview",
    offer_pending: "Offer Pending",
    offer_accepted: "Offer Accepted",
    offer_rejected: "Offer Rejected",
  };

  return statusMap[status] || "Unknown Status";
}

const ListingDetails = () => {
  const router = useRouter();
  const { applicationId, listingId } = router.query;
  const { data, isPending, error } = useGetApplication(applicationId as string);
  const { data: application, isLoading } = useGetApplication(
    applicationId as string
  );
  const { mutate: updateApplication } = useUpdateApplication();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateApplication({
      body: {
        status: form.getValues("status"),
      },
      applicationId: applicationId as string,
    });
  };

  const { data: notes } = useGetApplicationNotes(applicationId as string);
  const [text, setText] = useState<string>("");

  const { mutate: createNote } = useCreateApplicationNote(
    applicationId as string
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: application?.status || "",
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={(event) => {
            event.preventDefault();
            router.push(`/listings/${listingId}/applications`);
          }}
          className="h-full mx-2 flex items-center cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </div>
        <div className="text-sm">All Applicants</div>
      </div>
      <div className="mt-2">
        <h2 className="!p-0 !m-0">
          {data.firstName} {data.lastName}
        </h2>
        <div>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
          <p>Updated At: {data.updatedAt}</p>

          <form onSubmit={onSubmit} className="w-2/3 space-y-6">
            <div className="flex justify-between gap-x-5">
              <Select
                onValueChange={(val) => form.setValue("status", val)}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder={getPrettyStatus(data.status)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer_pending">Offer Pending</SelectItem>
                  <SelectItem value="offer_accepted">Offer Accepted</SelectItem>
                  <SelectItem value="offer_rejected">Offer Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" disabled={isPending}>
                Update Status
              </Button>
            </div>
          </form>
        </div>
        <form>
          <div>
            <Textarea
              placeholder="Add internal note here"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                createNote(
                  {
                    body: { text },
                    applicationId: applicationId as string,
                  },
                  {
                    onSuccess: () => {
                      setText("");
                    },
                  }
                );
              }}
            >
              add note
            </Button>
          </div>
        </form>
        {notes?.map((note) => (
          <div>
            <div>
              {note.admin.firstName} {note.admin.lastName}
            </div>
            <div>{note.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingDetails;
