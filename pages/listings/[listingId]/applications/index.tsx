import { PageComponent } from "../../../_app";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";
import { useRouter } from "next/router";
import useGetListingApplications from "@/src/requests/listings/useGetListingApplications";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";

const ApplicationsPage: PageComponent = () => {
  const router = useRouter();
  const listingId = router.query.listingId;

  const query = useGetListingApplications({
    listingId: listingId as string,
  });

  const handleSort = (columnName: string, direction: 'asc' | 'desc') => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: columnName, direction },
    });
  };

  return (
    <ListingWrapper>
      {/* <ApplicationsTable query={query} listingId={listingId as string} /> */}
      <ApplicationsTable query={query} listingId={listingId as string} onSort={handleSort} />
    </ListingWrapper>
  );
};
export default ApplicationsPage;