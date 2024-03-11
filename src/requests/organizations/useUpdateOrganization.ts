import { useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import useCustomMutation from "../useCustomMutation";
import { Font } from "@/src/utilities/interfaces";
import { Layout } from "@/src/utilities/interfaces";

interface UpdateOrganizationProps {
  body: {
    title?: string;
    dataUrl?: string;
    dataUrlBanner?: string;
    headerFont?: Font;
    bodyFont?: Font;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    accentColor?: string;
    layout?: Layout;
    description?: string | null;
    longDescription?: string | null;
    eeocEnabled?: boolean;
    veteranEnabled?: boolean;
    disabilityEnabled?: boolean;
    raceEnabled?: boolean;
    genderEnabled?: boolean;
  };
  organizationId: string;
}

const UpdateOrganization = async ({
  body,
  organizationId,
}: UpdateOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/organizations/${organizationId}`, body);

  return data;
};

const useUpdateOrganization = (
  showToast: boolean = true,
  invalidateQuery: boolean = true
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useCustomMutation({
    mutationFn: UpdateOrganization,
    onSuccess: () => {
      if (showToast) {
        toast({
          title: "Updated Organization Details",
          description: "nice work",
        });
      }
      if (invalidateQuery) {
        queryClient.invalidateQueries({ queryKey: OrganizationKeys.current });
      }
    },
    onMutate: (data: UpdateOrganizationProps) => {
      queryClient.setQueryData(
        OrganizationKeys.current,
        (previousData: Organization) => {
          const newData = { ...data.body };
          const oldData = { ...previousData };
          if (typeof newData.eeocEnabled !== "boolean") {
            if (newData.eeocEnabled === false) {
              newData.veteranEnabled = false;
              newData.disabilityEnabled = false;
              newData.raceEnabled = false;
              newData.genderEnabled = false;
            }
          }
          return {
            ...oldData,
            ...newData,
          };
        }
      );
    },
  });
};

export default useUpdateOrganization;
