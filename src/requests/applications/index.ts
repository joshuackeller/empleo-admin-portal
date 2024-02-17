const ApplicationQueryKeys = {
  all: ["applications"],
  single: (applicationId: string) => ["applications", applicationId],
};

export default ApplicationQueryKeys;
