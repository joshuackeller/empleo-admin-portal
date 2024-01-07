import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "../../useEmpleoApi";

interface UpdateSelfOrganizationProps {
  body: {
    title: string;
  };
  organizationId: string;
}

const UpdateSelfOrganization = async ({
  body,
  organizationId,
}: UpdateSelfOrganizationProps) => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/self/organizations/${organizationId}`, body);

  return data;
};

const useUpdateSelfOrganization = async () => {
  return useMutation({
    mutationFn: UpdateSelfOrganization,
  });
};

export default useUpdateSelfOrganization;
