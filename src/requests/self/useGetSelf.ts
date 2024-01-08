import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Self } from "@/src/utilities/interfaces";

const GetSelf = async (): Promise<Self> => {
  const api = useEmpleoApi();
  const { data } = await api.get("/self");

  return data;
};

const useGetSelf = () => {
  return useQuery({
    queryKey: ["SELF"],
    queryFn: GetSelf,
  });
};

export default useGetSelf;
