const ListingQueryKeys = {
  all: ["listings"],
  single: (listingId: string) => ["listings", listingId],
};

export default ListingQueryKeys;
