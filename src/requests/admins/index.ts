const AdminQueryKeys = {
  all: (page?:string, pageSize?: string) => ["admins", page || "", pageSize || ""],
};

export default AdminQueryKeys;
