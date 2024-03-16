const ApplicationQueryKeys = {
  all: (listingId: string, page?: string, pageSize?: string) => ["applications", listingId, page, pageSize],
  single: (applicationId: string) => ["applications", applicationId],
  notes: (applicationId: string) => ["applications", applicationId, "notes"],
};

export default ApplicationQueryKeys;
