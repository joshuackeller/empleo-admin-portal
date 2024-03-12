const ListingQueryKeys = {
  all: (page?: string, pageSize?: string) => [ "listings", page || "", pageSize || "" ],
  single: (listingId: string) => [ "listings", listingId ],
  applications: (listingId: string) => [
    ...ListingQueryKeys.single(listingId),
    "applications",
  ],
};

export default ListingQueryKeys;
