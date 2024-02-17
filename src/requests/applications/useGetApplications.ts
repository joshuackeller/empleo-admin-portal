import { Application, Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";

const GetApplications = async (listingId: string): Promise<Application[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/applications?listingId=${listingId}`);

  return data;
};

const useGetApplications = (listingId: string) => {
  return useQuery({
    queryKey: [ApplicationQueryKeys.all, listingId],
    queryFn: () => GetApplications(listingId),
  });
};

export default useGetApplications;
