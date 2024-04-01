import { Admin, Application, Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../useCustomMutation";
import ApplicationQueryKeys from ".";
import ListingQueryKeys from "../listings";

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

const useRemoveApplication = (listingId: string) => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: RemoveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ListingQueryKeys.applications(listingId),
      });
    },
  });
};

export default useRemoveApplication;
//comment
