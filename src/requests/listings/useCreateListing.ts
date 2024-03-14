import { Admin, EmploymentType } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import { Listing } from "@/src/utilities/interfaces";

interface CreateListingProps {
  body: {
    jobTitle: string;
    jobDescription?: string;
    shortDescription?: string;
    jobRequirements?: string;
    employmentType?: EmploymentType;
    location?: string;
    salaryRange?: string;
    published: boolean;
  };
}

const CreateListing = async ({
  body,
}: CreateListingProps): Promise<Listing> => {
  const api = useEmpleoApi();
  const { data } = await api.post("/listings", body);

  return data;
};

const useCreateListing = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: CreateListing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ListingQueryKeys.all(""),
      });
    },
  });
};

export default useCreateListing;
