import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Listing, Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import ListingQueryKeys from ".";

interface UpdateListingProps {
  body: {
    jobTitle: string;
    jobDescription?: string;
    jobRequirements?: string;
    employmentType?: string;
    location?: string;
    salaryRange?: string;
    published: boolean;
  };
  listingId: string;
}

const UpdateListing = async ({
  body,
  listingId,
}: UpdateListingProps): Promise<Listing> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/listings/${listingId}`, body);

  return data;
};

const useUpdateListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: UpdateListing,
    onSuccess: (response) => {
      toast({
        title: "Updated Listing Details",
        description: "nice work",
      });
      //   queryClient.invalidateQueries({
      //     queryKey: ListingQueryKeys.single(response.id),
      //   });
      queryClient.setQueryData(ListingQueryKeys.single(response.id), response);
    },
  });
};

export default useUpdateListing;
