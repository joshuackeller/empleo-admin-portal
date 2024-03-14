import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { EmploymentType, Listing } from "@/src/utilities/interfaces";
import { useToast } from "@/src/components/shadcn/use-toast";
import ListingQueryKeys from ".";

interface UpdateListingProps {
  body: {
    jobTitle?: string;
    jobDescription?: string;
    shortDescription?: string;
    jobRequirements?: string;
    employmentType?: EmploymentType;
    location?: string;
    salaryRange?: string;
    published?: boolean;
    linkedInUrlEnabled?: boolean;
    noteEnabled?: boolean;
    resumeEnabled?: boolean;
    coverLetterEnabled?: boolean;
    availableStartDateEnabled?: boolean;
    phoneEnabled?: boolean;
    addressEnabled?: boolean;
    cityEnabled?: boolean;
    stateEnabled?: boolean;
    zipEnabled?: boolean;
    usAuthorizedEnabled?: boolean;
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

interface useUpdateListingProps {
  listingId?: string;
  optimistic?: boolean;
  showToast?: boolean;
}

const useUpdateListing = ({
  listingId,
  optimistic = false,
  showToast = true,
}: useUpdateListingProps = {}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: UpdateListing,
    onMutate: (newData: UpdateListingProps) => {
      if (optimistic && listingId) {
        queryClient.setQueryData(
          ListingQueryKeys.single(listingId),
          (previousData: Listing) => ({
            ...previousData,
            ...newData.body,
          })
        );
      }
    },
    onSuccess: (response) => {
      if (showToast) {
        toast({
          title: "Updated Listing Details",
          description: "nice work",
        });
      }
      if (!optimistic || !listingId) {
        queryClient.invalidateQueries({
          queryKey: ListingQueryKeys.all(""),
        });
        queryClient.setQueryData(
          ListingQueryKeys.single(response.id),
          response
        );
      }
    },
  });
};

export default useUpdateListing;
