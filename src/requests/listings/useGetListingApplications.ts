import { Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ListingQueryKeys from ".";

const GetListingApplications = async (
  listingId: string
): Promise<Application[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/listings/${listingId}/applications`);

  return data;
};

const useGetListingApplications = (listingId: string) => {
  return useQuery({
    queryKey: ListingQueryKeys.applications(listingId),
    queryFn: () => GetListingApplications(listingId),
  });
};

export default useGetListingApplications;
