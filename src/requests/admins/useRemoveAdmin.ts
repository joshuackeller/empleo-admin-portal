import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQueryClient } from "@tanstack/react-query";
import AdminQueryKeys from ".";
import useCustomMutation from "../useCustomMutation";

interface RemoveAdminProps {
  adminId: string;
}

const RemoveAdmin = async ({ adminId }: RemoveAdminProps): Promise<Admin> => {
  const api = useEmpleoApi();
  const { data } = await api.delete(`/admins/${adminId}`);

  return data;
};

const useRemoveAdmin = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: RemoveAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AdminQueryKeys.all(),
      });
    },
  });
};

export default useRemoveAdmin;
