import { Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import ListingQueryKeys from ".";
import usePaginatedQuery, { PaginatedQueryParams } from "../usePaginatedQuery";

interface GetListingApplicationsProps extends PaginatedQueryParams {
  listingId: string;
}

const GetListingApplications = async ({
  listingId,
  page,
  pageSize,
  sort,
  direction,
}: GetListingApplicationsProps): Promise<{
  data: Application[];
  count: number;
}> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/listings/${listingId}/applications`, {
    params: {
      page,
      pageSize,
      sort,
      direction,
    },
  });

  return data;
};

interface useGetListingApplicationsProps {
  listingId: string;
}

const useGetListingApplications = ({
  listingId,
}: useGetListingApplicationsProps) => {
  return usePaginatedQuery({
    queryKey: ListingQueryKeys.applications(listingId),
    queryFn: (params) => GetListingApplications({ listingId, ...params }),
  });
};

export default useGetListingApplications;
