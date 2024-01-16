import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";

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
  return useMutation({
    mutationFn: UpdateOrganization,
  });
};

export default useUpdateOrganization;
