import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Listing, Organization } from "@/src/utilities/interfaces";
import ListingQueryKeys from ".";

interface GetListingProps {
  listingId: string;
}

const GetListing = async ({ listingId }: GetListingProps): Promise<Listing> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/listings/${listingId}`);

  return data;
};

const useGetListing = (listingId: string) => {
  return useQuery({
    queryFn: () => GetListing({ listingId }),
    queryKey: ListingQueryKeys.single(listingId),
    enabled: !!listingId,
  });
};

export default useGetListing;
