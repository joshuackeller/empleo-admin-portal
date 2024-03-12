import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ListingQueryKeys from ".";

interface GetListingsProps {
  page?: string;
  pageSize?: string;
}

const GetListings = async ({ page, pageSize }: GetListingsProps = {}): Promise<Listing[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/listings", {
    params: {
      page,
      pageSize,
    },
  });

  return data;
};

interface useGetListingsProps {
  page?: string;
  pageSize?: string;
}

const useGetListings = ({ page, pageSize }: useGetListingsProps = {}) => {
  return useQuery({
    queryKey: ListingQueryKeys.all(page, pageSize),
    queryFn: () => GetListings({ page, pageSize }),
  });
};

export default useGetListings;
