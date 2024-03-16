import { Application, Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";

interface GetApplicationsProps {
  listingId: string;
  page?: string;
  pageSize?: string;
}

const GetApplications = async ({ listingId, page, pageSize }: GetApplicationsProps): Promise<Application[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/applications", {
    params: {
      listingId,
      page,
      pageSize,
    },
  });

  return data;
};

interface useGetApplicationsProps {
  listingId: string;
  page?: string;
  pageSize?: string;
}

const useGetApplications = ({ listingId, page, pageSize }: useGetApplicationsProps) => {
  return useQuery({
    queryKey: ApplicationQueryKeys.all(listingId, page, pageSize),
    queryFn: () => GetApplications({ listingId, page, pageSize }),
  });
};

export default useGetApplications;
