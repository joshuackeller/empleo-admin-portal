const ApplicationQueryKeys = {
  all: ["applications"],
  single: (applicationId: string) => ["applications", applicationId],
  notes: (applicationId: string) => ["applications", applicationId, "notes"],
};

export default ApplicationQueryKeys;
