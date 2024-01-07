import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../../useEmpleoApi";

const GetSelfOrganizations = async () => {
  const api = useEmpleoApi();

  const { data } = await api.get("/self/organizations");

  return data;
};

const useGetSelfOrganizations = () => {
  return useQuery({
    queryFn: GetSelfOrganizations,
    queryKey: ["SELF", "ORGANIZATIONS"],
  });
};

export default useGetSelfOrganizations;
