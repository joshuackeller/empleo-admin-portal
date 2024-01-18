import useEmpleoApi from "@/src/requests/useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

interface SignInProps {
  body: {
    email: string;
    password: string;
  };
}

const SignIn = async ({ body }: SignInProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/sign_in", body);

  return data;
};

const useSignIn = () => {
  return useCustomMutation({
    mutationFn: SignIn,
  });
};

export default useSignIn;
