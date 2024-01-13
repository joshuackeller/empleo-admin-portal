import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

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
  return useCustomMutation({
    mutationFn: AddAdmin,
  });
};

export default useAddAdmin;
