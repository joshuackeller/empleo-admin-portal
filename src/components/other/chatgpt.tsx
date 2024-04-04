import React, { useCallback, useState } from "react";
import axios from "axios";
import useEmpleoApi from "@/src/requests/useEmpleoApi";
import { Input } from "../shadcn/Input";
import { Button } from "../shadcn/Button";
import { Form } from "../shadcn/Form";
import { Textarea } from "../shadcn/Textarea";
import { CopyIcon } from "lucide-react";
import { toast } from "../shadcn/use-toast";
import { Skeleton } from "../shadcn/Skeleton";

interface ChatGPTProps {
  listingId: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ listingId }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //copy chatgpt response to clipboard
  const handleIconClick = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      toast({
        title: "Copied",
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const api = useEmpleoApi();

    setIsLoading(true);

    try {
      const result = await api.post(`/listings/${listingId}/chatgpt`, {
        prompt: `${input}`,
      });
      setResponse(result.data.text);
    } catch (error) {
      console.error(error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label>
        Enter a prompt below to generate a job description. Make sure to read
        through and modify the job description as needed.
      </label>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Input:</label>
        <Textarea
          rows={3}
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a job description for a job posting that is for a warehouse worker that needs to be forklift certified."
        />
        <Button type="submit">Generate Job Description</Button>
      </form>
      <div>
        <label>Response:</label>
        <div style={{ position: "relative" }}>
          {isLoading ? (
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
                <Skeleton className="h-9 w-40" />
              </div>
            </div>
          ) : (
            <Textarea disabled rows={10} value={response || ""} />
          )}
          {response && (
            <>
              <CopyIcon
                className="h-4 w-4 top-2 right-2 absolute cursor-pointer"
                onClick={handleIconClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;
