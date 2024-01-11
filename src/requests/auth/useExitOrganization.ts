import useAuthContext from "@/src/utilities/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExitOrganization = () => {
  const { exitOrganization } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      exitOrganization();
      queryClient.clear();
      queryClient.invalidateQueries();
    },
  });
};

export default useExitOrganization;
