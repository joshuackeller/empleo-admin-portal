import {
  QueryClient,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { useToast } from "../components/shadcn/use-toast";
import HandleAPIError from "../utilities/HandleAPIError";
import { AxiosError, isAxiosError } from "axios";

const useCustomMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient
) => {
  const { toast } = useToast();
  return useMutation<TData, TError, TVariables, TContext>(
    {
      ...options,
      onError: (error) => {
        toast({
          variant: "destructive",
          title: HandleAPIError(error),
          description: "If that doesn't sound right, please contact support.",
        });
      },
    },
    queryClient
  );
};

export default useCustomMutation;
