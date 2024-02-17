import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Application, Listing, Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import ApplicationQueryKeys from ".";

interface UpdateApplicationProps {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    listingId: string;
    resumeUrl: string;
    coverLetter?: string;
  };
  ApplicationId: string;
}

const UpdateApplication = async ({
  body,
  ApplicationId,
}: UpdateApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/applications/${ApplicationId}`, body);

  return data;
};

const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: UpdateApplication,
    onSuccess: (response) => {
      toast({
        title: "Updated Application Details",
        description: "nice work",
      });
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.all,
      });
      queryClient.setQueryData(
        ApplicationQueryKeys.single(response.id),
        response
      );
    },
  });
};

export default useUpdateApplication;
