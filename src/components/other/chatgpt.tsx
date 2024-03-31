import React, { useCallback, useState } from "react";
import axios from "axios";
import useEmpleoApi from "@/src/requests/useEmpleoApi";
import { Input } from "../shadcn/Input";
import { Button } from "../shadcn/Button";
import { Form } from "../shadcn/Form";
import { Textarea } from "../shadcn/Textarea";
import { CopyIcon } from "lucide-react";
import { toast } from "../shadcn/use-toast";

interface ChatGPTProps {
  listingId: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ listingId }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
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

    try {
      const result = await api.post(`/listings/${listingId}/chatgpt`, {
        prompt: `${input}`,
      });
      setResponse(result.data.text);
    } catch (error) {
      console.error(error);
      setResponse("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Input:</label>
        <Input
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Generate Job Description</Button>
      </form>
      <div>
        <label>Response:</label>
        <div style={{ position: "relative" }}>
          <Textarea disabled rows={10} value={response || ""} />
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
