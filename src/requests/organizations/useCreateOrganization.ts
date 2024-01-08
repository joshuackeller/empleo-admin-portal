import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";

interface CreateOrganizationProps {
  body: {
    title: string;
  };
}

const CreateOrganization = async ({
  body,
}: CreateOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/organizations`, body);

  return data;
};

const useCreateOrganization = () => {
  return useMutation({
    mutationFn: CreateOrganization,
  });
};

export default useCreateOrganization;
