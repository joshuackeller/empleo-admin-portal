import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import useAuthContext from "@/src/utilities/useAuthContext";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";

interface GetCurrentOrganizationProps {
  organizationId: string;
}

const GetCurrentOrganization = async ({
  organizationId,
}: GetCurrentOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/organizations/${organizationId}`);

  return data;
};

const useGetCurrentOrganization = () => {
  const { organizationId } = useAuthContext();
  return useQuery({
    queryFn: () =>
      GetCurrentOrganization({ organizationId: organizationId || "" }),
    queryKey: OrganizationKeys.current,
    enabled: !!organizationId,
  });
};

export default useGetCurrentOrganization;
