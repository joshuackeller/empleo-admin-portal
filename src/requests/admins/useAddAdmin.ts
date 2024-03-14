import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import AdminQueryKeys from ".";

interface AddAdminProps {
  body: {
    email: string;
  };
}

const AddAdmin = async ({ body }: AddAdminProps): Promise<Admin> => {
  const api = useEmpleoApi();
  const { data } = await api.post("/admins", body);

  return data;
};

const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: AddAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AdminQueryKeys.all(),
      });
    },
  });
};

export default useAddAdmin;
