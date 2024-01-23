import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQueryClient } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import useCustomMutation from "../useCustomMutation";

interface RemoveListingProps {
  adminId: string;
}

const RemoveListing = async ({
  adminId,
}: RemoveListingProps): Promise<Admin> => {
  const api = useEmpleoApi();
  const { data } = await api.delete(`/admins/${adminId}`);

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
