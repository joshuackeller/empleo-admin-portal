import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ListingQueryKeys from ".";

const GetListings = async (): Promise<Listing[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/listings");

  return data;
};

const useGetListings = () => {
  return useQuery({
    queryKey: ListingQueryKeys.all,
    queryFn: GetListings,
  });
};

export default useGetListings;
