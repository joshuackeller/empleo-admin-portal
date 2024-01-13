import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useMutation } from "@tanstack/react-query";

interface DeleteAdminProps {
  admin_id: string;
}

const DeleteAdmin = async ({ admin_id }: DeleteAdminProps): Promise<Admin> => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/admins/${admin_id}`);

  return data;
};

const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: DeleteAdmin,
  });
};

export default useDeleteAdmin;
