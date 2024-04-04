import useCustomMutation from "../useCustomMutation";
import useEmpleoApi from "../useEmpleoApi";

interface GenerateListingDescriptionProps {
  body: {
    prompt: string;
  };
  listingId: string;
}

const GenerateListingDescription = async ({
  body,
  listingId,
}: GenerateListingDescriptionProps): Promise<{ text: string }> => {
  const api = useEmpleoApi();

  const response = await api.post(`/listings/${listingId}/chatgpt`, body);

  return response?.data;
};

const useGenerateListingDescription = () => {
  return useCustomMutation({
    mutationFn: GenerateListingDescription,
  });
};

export default useGenerateListingDescription;
