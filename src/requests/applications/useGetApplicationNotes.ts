import { ApplicationNote } from "../../utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";

const GetApplicationNotes = async (
  applicationId: string
): Promise<ApplicationNote[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/applications/${applicationId}/notes`);

  return data;
};

const useGetApplicationNotes = (applicationId: string) => {
  return useQuery({
    queryKey: ApplicationQueryKeys.notes(applicationId),
    queryFn: () => GetApplicationNotes(applicationId),
  });
};

export default useGetApplicationNotes;
