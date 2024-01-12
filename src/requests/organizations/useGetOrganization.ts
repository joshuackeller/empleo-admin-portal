import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";

interface GetOrganizationProps {
  organizationId: string;
}

const GetOrganization = async ({
  organizationId,
}: GetOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/organizations/${organizationId}`);

  return data;
};

const useGetOrganization = (organizationId: string) => {
  return useQuery({
    queryFn: () => GetOrganization({ organizationId }),
    queryKey: ["ORGANIZATIONS", organizationId],
    enabled: !!organizationId,
  });
};

export default useGetOrganization;
