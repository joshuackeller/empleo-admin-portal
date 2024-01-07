import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "../../useEmpleoApi";

interface CreateSelfOrganizationProps {
  body: {
    title: string;
  };
}

const CreateSelfOrganization = async ({
  body,
}: CreateSelfOrganizationProps) => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/self/organizations`, body);

  return data;
};

const useCreateSelfOrganization = () => {
  return useMutation({
    mutationFn: CreateSelfOrganization,
  });
};

export default useCreateSelfOrganization;
