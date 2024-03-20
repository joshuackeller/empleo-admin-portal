import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import AdminQueryKeys from ".";
import usePaginatedQuery, { PaginatedQueryParams } from "../usePaginatedQuery";

interface GetAdminsProps extends PaginatedQueryParams {}

const GetAdmins = async ({
  page,
  pageSize,
  sort,
  direction,
}: GetAdminsProps): Promise<{ data: Admin[]; count: number }> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/admins", {
    params: {
      page,
      pageSize,
      sort,
      direction,
    },
  });

  return data;
};

const useGetAdmins = () => {
  return usePaginatedQuery({
    queryKey: AdminQueryKeys.all,
    queryFn: GetAdmins,
  });
};

export default useGetAdmins;
