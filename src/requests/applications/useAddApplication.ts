import { Admin, Application } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import ListingQueryKeys from ".";
import { Listing } from "@/src/utilities/interfaces";
import ApplicationQueryKeys from ".";

interface AddApplicationProps {
  body: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    usCitizen: boolean;
    workVisa: boolean;
    workVisaType: string;
    language: string;
    availableStartDate: Date;
    note: string;
    relocate: boolean;
    //email: string;
    //listingId: string;
    //resumeUrl: string;
    //coverLetter?: string;
  };
}

const AddApplication = async ({
  body,
}: AddApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.post("/applications", body);

  return data;
};

const useAddApplication = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: AddApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.all(""),
      });
    },
  });
};

export default useAddApplication;
