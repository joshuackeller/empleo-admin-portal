import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";

interface UpdateOrganizationProps {
  body: {
    title: string;
  };
  organizationId: string;
}

const UpdateOrganization = async ({
  body,
  organizationId,
}: UpdateOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/organizations/${organizationId}`, body);

  return data;
};

const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OrganizationKeys.current,
      });
    },
  });
};

export default useUpdateOrganization;
