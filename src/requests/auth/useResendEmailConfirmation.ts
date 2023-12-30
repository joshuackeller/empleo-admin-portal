import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "@/src/requests/useEmpleoApi";

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
  return useMutation({
    mutationFn: ResendEmailConfirmation,
  });
};

export default useResendEmailConfirmation;
