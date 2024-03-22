import { Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";
import { PaginatedQueryParams } from "../usePaginatedQuery";

interface GetApplicationsProps extends PaginatedQueryParams {
  listingId: string;
}

const GetApplications = async ({
  listingId,
  page,
  pageSize,
  sort,
  direction,
}: GetApplicationsProps): Promise<{ data: Application[]; count: number }> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/applications", {
    params: {
      listingId,
      page,
      pageSize,
      sort,
      direction,
    },
  });

  return data;
};

interface useGetApplicationsProps {
  listingId: string;
}

const useGetApplications = ({ listingId }: useGetApplicationsProps) => {
  return useQuery({
    queryKey: ApplicationQueryKeys.all,
    queryFn: (params) => GetApplications({ listingId, ...params }),
  });
};

export default useGetApplications;
