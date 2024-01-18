import { Self } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";

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
  return useCustomMutation({
    mutationFn: UpdateSelf,
  });
};

export default useUpdateSelf;
