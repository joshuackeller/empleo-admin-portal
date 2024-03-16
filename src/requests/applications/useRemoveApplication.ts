import { Admin, Application, Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../useCustomMutation";
import ApplicationQueryKeys from ".";

interface RemoveApplicationProps {
  applicationId: string;
}

const RemoveApplication = async ({
  applicationId,
}: RemoveApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.delete(`/applications/${applicationId}`);

  return data;
};

const useRemoveApplication = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: RemoveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.all,
      });
    },
  });
};

export default useRemoveApplication;
