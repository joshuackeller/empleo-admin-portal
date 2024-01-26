import { useQueryClient } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Organization } from "@/src/utilities/interfaces";
import OrganizationKeys from ".";
import { useToast } from "@/src/components/shadcn/use-toast";
import useCustomMutation from "../useCustomMutation";

interface UpdateOrganizationProps {
  body: {
    title: string;
    dataUrl?: string;
    slug: string;
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

const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useCustomMutation({
    mutationFn: UpdateOrganization,
    onSuccess: () => {
      toast({
        title: "Updated Organization Details",
        description: "nice work",
      });
      queryClient.invalidateQueries({
        queryKey: OrganizationKeys.current,
      });
    },
  });
};

export default useUpdateOrganization;




// ALMOST THERE (MAYBE)
// import { useQueryClient } from "@tanstack/react-query";
// import useEmpleoApi from "../useEmpleoApi";
// import { Organization } from "@/src/utilities/interfaces";
// import OrganizationKeys from ".";
// import { useToast } from "@/src/components/shadcn/use-toast";
// import useCustomMutation from "../useCustomMutation";

// interface UpdateOrganizationProps {
//   body: {
//     title: string;
//     // dataUrl?: string;
//     slug: string;
//   };
//   organizationId: string;
// }

// const UpdateOrganization = async ({
//   body,
//   organizationId,
// }: UpdateOrganizationProps): Promise<Organization> => {
//   const api = useEmpleoApi();
//   const { data } = await api.put(`/organizations/${organizationId}`, body);

//   return data;
// };

// const useUpdateOrganization = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();
//   return useCustomMutation({
//     mutationFn: UpdateOrganization,
//     onSuccess: () => {
//       toast({
//         title: "Updated Organization Details",
//         description: "nice work",
//       });
//       queryClient.invalidateQueries({
//         queryKey: OrganizationKeys.current,
//       });
//     },
//   });
// };

// export default useUpdateOrganization;
