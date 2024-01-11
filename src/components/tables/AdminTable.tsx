import useGetAdmins from "@/src/requests/admins/useGetAdmins";
import { Admin } from "@/src/utilities/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/shadcn/DataTable";
import { Skeleton } from "@/src/components/shadcn/Skeleton";

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const AdminTable = () => {
  const { data } = useGetAdmins();

  if (!data) return <Skeleton className="h-24 w-full" />;

  return <DataTable columns={columns} data={data} />;
};

export default AdminTable;
