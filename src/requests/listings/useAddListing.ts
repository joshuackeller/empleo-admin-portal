import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import { Listing } from "@/src/utilities/interfaces";

interface AddListingProps {
  body: {
    jobTitle: string;
    jobDescription?: string;
    shortDescription?: string;
    jobRequirements?: string;
    employmentType?: string;
    location?: string;
    salaryRange?: string;
    published: boolean;
  };
}

const AddListing = async ({ body }: AddListingProps): Promise<Listing> => {
  const api = useEmpleoApi();
  const { data } = await api.post("/listings", body);

  return data;
};

const useAddListing = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: AddListing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ListingQueryKeys.all,
      });
    },
  });
};

export default useAddListing;
