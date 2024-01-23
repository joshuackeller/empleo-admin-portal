import useEmpleoApi from "@/src/requests/useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

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
  return useCustomMutation({
    mutationFn: ResetPasswordRequest,
  });
};

export default useResetPasswordRequest;
