const ListingQueryKeys = {
  all: ["listings"],
  single: (listingId: string) => [...ListingQueryKeys.all, listingId],
  applications: (listingId: string) => [
    ...ListingQueryKeys.single(listingId),
    "applications",
  ],
};

export default ListingQueryKeys;
