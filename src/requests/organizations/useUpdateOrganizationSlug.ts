import { useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import useCustomMutation from "../useCustomMutation";

interface UpdateOrganizationSlugProps {
  body: {
    slug: string;
  };
  organizationId: string;
}

const UpdateOrganizationSlug = async ({
  body,
  organizationId,
}: UpdateOrganizationSlugProps): Promise<Organization> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/organizations/${organizationId}/slug`, body);

  return data;
};

const useUpdateOrganizationSlug = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useCustomMutation({
    mutationFn: UpdateOrganizationSlug,
    onSuccess: () => {
      toast({
        title: "Updated Organization Slug",
        description: "Your website domain will update within 24 hours",
      });
      queryClient.invalidateQueries({
        queryKey: OrganizationKeys.current,
      });
    },
  });
};

export default useUpdateOrganizationSlug;
