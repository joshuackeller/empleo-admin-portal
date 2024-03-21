import { Self } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useToast } from "@/src/components/shadcn/use-toast";

interface UpdateSelfProps {
  body: {
    firstName: string;
    lastName?: string;
  };
}

const UpdateSelf = async ({ body }: UpdateSelfProps): Promise<Self> => {
  const api = useEmpleoApi();
  const { data } = await api.put("/self", body);

  return data;
};

const useUpdateSelf = () => {
  const { toast } = useToast();
  return useCustomMutation({
    mutationFn: UpdateSelf,
    onSuccess: () => {
      toast({
        title: "Updated Account",
        description: "nice work",
      });
    },
  });
};

export default useUpdateSelf;
