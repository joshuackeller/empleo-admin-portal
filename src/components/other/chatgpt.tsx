import React, { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import useEmpleoApi from "@/src/requests/useEmpleoApi";
import { Input } from "../shadcn/Input";
import { Button, buttonVariants } from "../shadcn/Button";
import { Form } from "../shadcn/Form";
import { Textarea } from "../shadcn/Textarea";
import { CopyIcon, RefreshCcw, RefreshCwIcon } from "lucide-react";
import { toast } from "../shadcn/use-toast";
import { Skeleton } from "../shadcn/Skeleton";
import { cn } from "@/src/utilities/cn";
import { Label } from "../shadcn/Label";
import useGenerateListingDescription from "@/src/requests/listings/useGenerateListingDescription";

interface ChatGPTProps {
  listingId: string;
}

const ChatGPT = ({ listingId }: ChatGPTProps) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const copyToClipboard = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      toast({
        title: "Copied",
        duration: 2000,
      });
    }
  };

  const {
    mutate: generateDescription,
    isPending,
    isSuccess,
  } = useGenerateListingDescription();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    generateDescription(
      {
        listingId,
        body: {
          prompt: input,
        },
      },
      {
        onSuccess: (data) => {
          setResponse(data.text);
        },
      }
    );
  };

  const LINES = 6;

  return (
    <div>
      <form>
        <Label>Enter a prompt below to generate a job description</Label>
        <Textarea
          rows={3}
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Prompt..."
        />
        <div className="my-2 flex justify-end">
          <Button
            type="submit"
            className="gap-x-1"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Generate Job Description
          </Button>
        </div>
      </form>

      <div className="pt-2">
        {(isPending || response) && (
          <>
            <div className="muted-text">
              Make sure to read through and modify the job description as
              needed.
            </div>
            {isPending ? (
              <div className="space-y-1 border rounded-lg p-2 my-2 pb-24">
                {Array.from({ length: LINES }, (_, i) => i).map((i) => (
                  <Skeleton
                    className={cn("h-4 ", i === LINES - 1 ? "w-1/3" : "w-full")}
                    key={i}
                  />
                ))}
              </div>
            ) : (
              response && (
                <>
                  <div className="space-y-1 border rounded-lg p-2 my-2 pb-24 relative">
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                    <div
                      className="top-0 right-0 absolute cursor-pointer bg-white z-10 p-1 border rounded-bl border-r-0 border-t-0"
                      onClick={copyToClipboard}
                    >
                      <CopyIcon className="h-4 w-4 " />
                    </div>
                  </div>
                </>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatGPT;
