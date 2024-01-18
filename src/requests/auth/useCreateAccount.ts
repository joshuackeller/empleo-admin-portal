import { useMutation } from "@tanstack/react-query";
import useEmpleoApi from "@/src/requests/useEmpleoApi";

interface CreateAccountProps {
  body: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  };
}

const CreateAccount = async ({ body }: CreateAccountProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/create_account", body);

  return data;
};

const useCreateAccount = () => {
  return useMutation({
    mutationFn: CreateAccount,
  });
};

export default useCreateAccount;
