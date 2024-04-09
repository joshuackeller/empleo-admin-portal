import { Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import ListingQueryKeys from ".";
import usePaginatedQuery, { PaginatedQueryParams } from "../usePaginatedQuery";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import ApplicationQueryKeys from "../applications";

interface GetListingApplicationsProps extends PaginatedQueryParams {
  listingId: string;
  queryClient?: QueryClient;
}

const GetListingApplications = async ({
  listingId,
  page,
  pageSize,
  sort,
  direction,
  queryClient,
  search,
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
      search,
    },
  });

  if (data.data && queryClient) {
    for (const application of data.data) {
      queryClient.setQueryData(
        ApplicationQueryKeys.single(application.id),
        application
      );
    }
  }

  return data;
};

interface useGetListingApplicationsProps {
  listingId: string;
}

const useGetListingApplications = ({
  listingId,
}: useGetListingApplicationsProps) => {
  const queryClient = useQueryClient();

  return usePaginatedQuery({
    queryKey: ListingQueryKeys.applications(listingId),
    queryFn: (params) =>
      GetListingApplications({ listingId, queryClient, ...params }),
  });
};

export default useGetListingApplications;
