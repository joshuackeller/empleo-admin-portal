import { useQueryClient } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { ApplicationNote } from "@/src/utilities/interfaces";

interface CreateApplicationNoteProps {
  body: {
    text: string;
  };
  applicationId: string;
}

const CreateApplicationNote = async ({
  body,
  applicationId,
}: CreateApplicationNoteProps): Promise<ApplicationNote> => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/applications/${applicationId}/notes`, body);

  return data;
};

const useCreateApplicationNote = (applicationId: string) => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: CreateApplicationNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.notes(applicationId),
      });
    },
  });
};

export default useCreateApplicationNote;
