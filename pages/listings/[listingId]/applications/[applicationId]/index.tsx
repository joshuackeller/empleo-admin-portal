import { Button } from "@/src/components/shadcn/Button";
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
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormEvent, useState } from "react";
import useCreateApplicationNote from "@/src/requests/applications/useCreateApplicationNote";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/components/shadcn/Alert";
import { Label } from "@/src/components/shadcn/Label";
import { Input } from "@/src/components/shadcn/Input";
import { cn } from "@/src/utilities/cn";
import ApplicationWrapper from "@/src/layout/wrappers/ApplicationWrapper";
import { DateTime } from "luxon";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import useGetListing from "@/src/requests/listings/useGetListing";
import { Separator } from "@/src/components/shadcn/Separator";
import FileViewer from "@/src/components/other/FileViewer";

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

const SingleApplicationDetails = () => {
  const router = useRouter();
  const { applicationId, listingId } = router.query;

  const { data: application, isLoading } = useGetApplication(
    applicationId as string
  );
  const { data: listing } = useGetListing(listingId as string);
  const { data: notes } = useGetApplicationNotes(applicationId as string);

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

  const [text, setText] = useState<string>("");
  const { mutate: createNote, isPending: isCreatingNote } =
    useCreateApplicationNote(applicationId as string);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: application?.status || "",
    },
  });

  return (
    <ApplicationWrapper>
      <div className="mt-2">
        {!!listing && !!application ? (
          <div>
            <form onSubmit={onSubmit} className="max-w-2xl space-y-2.5">
              <div className="grid grid-cols-2 gap-x-5">
                <div>
                  <Label>First Name</Label>
                  <Input disabled value={application?.firstName} />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input disabled value={application?.lastName} />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="flex justify-between gap-x-5">
                  <Select
                    onValueChange={(val) => form.setValue("status", val)}
                    defaultValue={application?.status}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={getPrettyStatus(application?.status)}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer_pending">
                        Offer Pending
                      </SelectItem>
                      <SelectItem value="offer_accepted">
                        Offer Accepted
                      </SelectItem>
                      <SelectItem value="offer_rejected">
                        Offer Rejected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" disabled={isLoading}>
                    Update Status
                  </Button>
                </div>
              </div>

              {listing?.linkedInUrlEnabled && (
                <div>
                  <Label>LinkedIn Url</Label>
                  <div className="relative">
                    <Input disabled value={application?.linkedInUrl || ""} />
                    {application?.linkedInUrl && (
                      <>
                        <a
                          href={application?.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "absolute inset-0 z-10",
                            application?.coverLetter?.url
                              ? "cursor-pointer"
                              : "cursor-default"
                          )}
                        ></a>
                        <ExternalLinkIcon className="h-4 w-4 top-2 right-2 absolute" />
                      </>
                    )}
                  </div>
                </div>
              )}
              {listing?.resumeEnabled && (
                <div>
                  <Label>Resume</Label>
                  <div className="relative">
                    <Input disabled value={application?.resume?.name || ""} />
                    {application?.resume?.url && (
                      <>
                        <a
                          href={application?.resume?.url}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "absolute inset-0 z-10",
                            application?.resume?.url
                              ? "cursor-pointer"
                              : "cursor-default"
                          )}
                        ></a>
                        <ExternalLinkIcon className="h-4 w-4 top-2 right-2 absolute" />
                      </>
                    )}
                  </div>
                </div>
              )}
              <div>
                {application.resume && (
                  <FileViewer
                    uri={application.resume?.url}
                    fileType={application.resume?.fileType}
                  />
                )}
              </div>
              {listing?.coverLetterEnabled && (
                <div>
                  <Label>Cover Letter</Label>
                  <div className="relative">
                    <Input
                      disabled
                      value={application?.coverLetter?.name || ""}
                    />

                    {application?.coverLetter?.url && (
                      <>
                        <a
                          href={application?.coverLetter?.url}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "absolute inset-0 z-10",
                            application?.coverLetter?.url
                              ? "cursor-pointer"
                              : "cursor-default"
                          )}
                        ></a>
                        <ExternalLinkIcon className="h-4 w-4 top-2 right-2 absolute" />
                      </>
                    )}
                  </div>
                </div>
              )}

              {listing?.addressEnabled && (
                <div>
                  <Label>Address</Label>
                  <Input disabled value={application?.address || ""} />
                </div>
              )}
              <div className="grid grid-cols-3 gap-x-5">
                {listing?.cityEnabled && (
                  <div>
                    <Label>City</Label>
                    <Input disabled value={application?.city || ""} />
                  </div>
                )}

                {listing?.stateEnabled && (
                  <div>
                    <Label>State</Label>
                    <Input disabled value={application?.state || ""} />
                  </div>
                )}
                {listing?.zipEnabled && (
                  <div>
                    <Label>Zip</Label>
                    <Input disabled value={application?.zip || ""} />
                  </div>
                )}
              </div>
              {listing?.phoneEnabled && (
                <div>
                  <Label>Phone</Label>
                  <Input disabled value={application?.phone || ""} />
                </div>
              )}
              {listing?.noteEnabled && (
                <div>
                  <Label>Feel free to add anything else we should know!</Label>
                  <Textarea disabled value={application?.note || ""} />
                </div>
              )}
              {listing?.usAuthorizedEnabled && (
                <div>
                  <Label>Authorized to Work in the United States?</Label>
                  <Input
                    disabled
                    value={
                      typeof application?.usAuthorized === "boolean"
                        ? application?.usAuthorized
                          ? "Yes"
                          : "No"
                        : "-"
                    }
                  />
                </div>
              )}
              {listing?.availableStartDateEnabled && (
                <div>
                  <Label>Available Start Date</Label>
                  <Input
                    disabled
                    value={
                      application?.availableStartDate
                        ? DateTime.fromISO(
                            application.availableStartDate
                          ).toLocaleString(DateTime.DATE_MED)
                        : ""
                    }
                  />
                </div>
              )}
            </form>
            <div className="max-w-2xl mb-12">
              <Separator className="my-5" />
              <h4>Internal Notes</h4>
              <form>
                <div>
                  <Textarea
                    placeholder="Add your thoughts here..."
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      disabled={isCreatingNote || text === ""}
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
                      Add Note
                    </Button>
                  </div>
                </div>
              </form>
              <div className="space-y-7 my-5">
                {notes?.map((note) => (
                  <div>
                    <div className="flex gap-x-2">
                      <div>
                        <p className="text-xs font-semibold">
                          {note.admin.firstName} {note.admin.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          {DateTime.fromISO(note.createdAt).toLocaleString(
                            DateTime.DATETIME_MED
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm">{note.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 max-w-2xl">
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        )}
      </div>
    </ApplicationWrapper>
  );
};

export default SingleApplicationDetails;
