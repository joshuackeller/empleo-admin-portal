import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { keepPreviousData } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import usePaginatedQuery, { PaginatedQueryParams } from "../usePaginatedQuery";

interface GetListingsProps extends PaginatedQueryParams {}

const GetListings = async ({
  page,
  pageSize,
  sort,
  direction,
}: GetListingsProps): Promise<{
  data: Listing[];
  count: number;
}> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/listings", {
    params: {
      page,
      pageSize,
      sort,
      direction,
    },
  });

  return data;
};

export const useGetListings = () => {
  return usePaginatedQuery({
    queryKey: ListingQueryKeys.all,
    queryFn: GetListings,
    placeholderData: keepPreviousData,
  });
};

export default useGetListings;
