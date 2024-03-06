import { PageComponent } from "../../../_app";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";
import { useRouter } from "next/router";
import useGetListingApplications from "@/src/requests/listings/useGetListingApplications";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";

const ApplicationsPage: PageComponent = () => {
  const router = useRouter();
  const listingId = router.query.listingId;
  const { data: applications, isFetching } = useGetListingApplications(
    listingId as string
  );

  return (
    <ListingWrapper>
      <div className="mt-3">
        <ApplicationsTable
          listingId={listingId as string}
          applications={applications}
          isFetching={isFetching}
        />
      </div>
    </ListingWrapper>
  );
};
export default ApplicationsPage;
