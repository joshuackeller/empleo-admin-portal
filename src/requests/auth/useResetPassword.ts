import useEmpleoApi from "@/src/requests/useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

interface ResetPasswordProps {
  body: {
    token: string;
    password: string;
  };
}

const ResetPassword = async ({ body }: ResetPasswordProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/reset_password", body);

  return data;
};

const useResetPassword = () => {
  return useCustomMutation({
    mutationFn: ResetPassword,
  });
};

export default useResetPassword;
