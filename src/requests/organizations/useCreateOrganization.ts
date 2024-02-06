import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import useCustomMutation from "../useCustomMutation";

interface CreateOrganizationProps {
  body: {
    title: string;
    slug: string;
    cloudflareToken: string;
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
  return useCustomMutation({
    mutationFn: CreateOrganization,
  });
};

export default useCreateOrganization;
