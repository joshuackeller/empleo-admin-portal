import useAuthContext from "@/src/utilities/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignOut = () => {
  const { signOut, exitOrganization } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      signOut();
      exitOrganization();
      queryClient.clear();
      queryClient.invalidateQueries();
    },
  });
};

export default useSignOut;
