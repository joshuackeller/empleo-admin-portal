import { Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ListingQueryKeys from ".";

interface GetListingApplicationsProps {
  listingId: string;
  page?: string;
  pageSize?: string;
}

const GetListingApplications = async ({ listingId, page, pageSize }: GetListingApplicationsProps): Promise<Application[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/listings/${listingId}/applications`, {
    params: {
      page,
      pageSize,
    },
  });

  return data;
};

interface useGetListingApplicationsProps {
  listingId: string;
  page?: string;
  pageSize?: string;
}

const useGetListingApplications = ({ listingId, page, pageSize }: useGetListingApplicationsProps) => {
  return useQuery({
    queryKey: ListingQueryKeys.applications(listingId),
    queryFn: () => GetListingApplications({ listingId, page, pageSize }),
  });
};

export default useGetListingApplications;
