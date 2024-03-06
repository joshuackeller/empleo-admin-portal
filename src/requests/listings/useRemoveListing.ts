import { Admin, Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQueryClient } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import useCustomMutation from "../useCustomMutation";

interface RemoveListingProps {
  listingId: string;
}

const RemoveListing = async ({
  listingId,
}: RemoveListingProps): Promise<Listing> => {
  const api = useEmpleoApi();
  const { data } = await api.delete(`/listings/${listingId}`);

  return data;
};

const useRemoveListing = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: RemoveListing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ListingQueryKeys.all,
      });
    },
  });
};

export default useRemoveListing;
