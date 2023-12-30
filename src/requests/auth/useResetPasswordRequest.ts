import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "@/src/requests/useEmpleoApi";

interface ResetPasswordRequestProps {
  body: {
    email: string;
  };
}

const ResetPasswordRequest = async ({ body }: ResetPasswordRequestProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/reset_password/request", body);

  return data;
};

const useResetPasswordRequest = () => {
  return useMutation({
    mutationFn: ResetPasswordRequest,
  });
};

export default useResetPasswordRequest;
