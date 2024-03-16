import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Application, Listing, Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import ApplicationQueryKeys from ".";

interface UpdateApplicationProps {
  body: {
    status?: string;
    applicationNote?: string;
  };
  applicationId: string;
}

const UpdateApplication = async ({
  body,
  applicationId,
}: UpdateApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/applications/${applicationId}`, body);

  return data;
};

const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: UpdateApplication,
    onSuccess: (response) => {
      toast({
        title: "Updated Application Status",
        description: "nice work",
      });
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.all(""),
      });
      queryClient.setQueryData(
        ApplicationQueryKeys.single(response.id),
        response
      );
    },
  });
};

export default useUpdateApplication;
