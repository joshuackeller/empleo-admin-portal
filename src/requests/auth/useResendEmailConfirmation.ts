import useEmpleoApi from "@/src/requests/useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

interface ResendEmailConfirmationProps {
  body: {
    email: string;
  };
}

const ResendEmailConfirmation = async ({
  body,
}: ResendEmailConfirmationProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/resend", body);

  return data;
};

const useResendEmailConfirmation = () => {
  return useCustomMutation({
    mutationFn: ResendEmailConfirmation,
  });
};

export default useResendEmailConfirmation;
