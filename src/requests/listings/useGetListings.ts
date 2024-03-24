import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import {
  keepPreviousData,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import ListingQueryKeys from ".";
import usePaginatedQuery, { PaginatedQueryParams } from "../usePaginatedQuery";

interface GetListingsProps extends PaginatedQueryParams {
  queryClient?: QueryClient;
}

const GetListings = async ({
  page,
  pageSize,
  sort,
  direction,
  search,
  queryClient,
}: GetListingsProps): Promise<{
  data: Listing[];
  count: number;
}> => {
  const api = useEmpleoApi();
  // const queryClient   = useQueryClient();

  const { data } = await api.get("/listings", {
    params: {
      page,
      pageSize,
      sort,
      direction,
      search,
    },
  });

  if (data.data && queryClient) {
    for (const listing of data.data) {
      queryClient.setQueryData(ListingQueryKeys.single(listing.id), listing);
    }
  }

  return data;
};

export const useGetListings = () => {
  const queryClient = useQueryClient();
  return usePaginatedQuery({
    queryKey: ListingQueryKeys.all,
    queryFn: (params) => GetListings({ ...params, queryClient }),
    placeholderData: keepPreviousData,
  });
};

export default useGetListings;
