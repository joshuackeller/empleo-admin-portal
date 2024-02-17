import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Application, Listing, Organization } from "@/src/utilities/interfaces";
import ApplicationQueryKeys from ".";

interface GetApplicationProps {
  applicationId: string;
}

const GetApplication = async ({
  applicationId,
}: GetApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/applications/${applicationId}`);

  return data;
};

const useGetApplication = (applicationId: string) => {
  return useQuery({
    queryFn: () => GetApplication({ applicationId }),
    queryKey: ApplicationQueryKeys.single(applicationId),
    enabled: !!applicationId,
  });
};

export default useGetApplication;
