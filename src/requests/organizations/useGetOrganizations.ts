import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";

const GetOrganizations = async (): Promise<Organization[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/organizations");

  return data;
};

const useGetOrganizations = () => {
  return useQuery({
    queryFn: GetOrganizations,
    queryKey: OrganizationKeys.all,
  });
};

export default useGetOrganizations;
