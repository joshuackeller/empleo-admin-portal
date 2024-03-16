import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import AdminQueryKeys from ".";

interface GetAdminsProps {
  page?: string;
  pageSize?: string;
}

const GetAdmins = async ({page, pageSize}: GetAdminsProps = {}): Promise<Admin[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/admins", {
    params: {
      page,
      pageSize
    }
  });

  return data;
};

interface useGetAdminsProps {
  page?: string;
  pageSize?: string;
}

const useGetAdmins = ({page, pageSize}: useGetAdminsProps = {}) => {
  return useQuery({
    queryKey: AdminQueryKeys.all(page, pageSize),
    queryFn: () => GetAdmins({page, pageSize}),
    // enabled: !!page && !!pageSize,
  });
};

export default useGetAdmins;
