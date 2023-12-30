import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "@/src/requests/useEmpleoApi";

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
  return useMutation({
    mutationFn: ResetPassword,
  });
};

export default useResetPassword;
