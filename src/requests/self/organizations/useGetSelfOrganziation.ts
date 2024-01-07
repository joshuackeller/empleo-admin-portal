import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../../useEmpleoApi";

interface GetSelfOrganizationProps {
  organizationId: string;
}

const GetSelfOrganization = async ({
  organizationId,
}: GetSelfOrganizationProps) => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/self/organizations/${organizationId}`);

  return data;
};

const useGetSelfOrganization = (organizationId: string) => {
  return useQuery({
    queryFn: () => GetSelfOrganization({ organizationId }),
    queryKey: ["SELF", "ORGANIZATIONS", organizationId],
    enabled: !!organizationId,
  });
};

export default useGetSelfOrganization;
