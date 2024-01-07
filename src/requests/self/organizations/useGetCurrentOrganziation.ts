import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../../useEmpleoApi";
import useAuthContext from "@/src/utilities/useAuthContext";

interface GetCurrentOrganizationProps {
  organizationId: string;
}

const GetCurrentOrganization = async ({
  organizationId,
}: GetCurrentOrganizationProps) => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/self/organizations/${organizationId}`);

  return data;
};

const useGetCurrentOrganization = () => {
  const { organizationId } = useAuthContext();
  return useQuery({
    queryFn: () =>
      GetCurrentOrganization({ organizationId: organizationId || "" }),
    queryKey: ["SELF", "ORGANIZATIONS", "CURRENT"],
    enabled: !!organizationId,
  });
};

export default useGetCurrentOrganization;
