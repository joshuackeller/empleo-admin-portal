import { PageComponent } from "../../../_app";
import { z } from "zod";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";
import { useRouter } from "next/router";
import useGetListingApplications from "@/src/requests/listings/useGetListingApplications";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import { Button } from "@/src/components/shadcn/Button";
import useUpdateListing from "@/src/requests/listings/useUpdateListing";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  //gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  usCitizen: z.boolean().optional(),
  workVisa: z.boolean().optional(),
  workVisaType: z.string().optional(),
  language: z.string().optional(),
  availableStartDate: z.date().optional(),
  note: z.string().optional(),
  relocate: z.boolean().optional(),
});

const ApplicationsPage: PageComponent = () => {
  const { mutate: updateListing, isPending } = useUpdateListing();
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
      <div className="flex justify-start mt-3 mb-4">
        <Button
          variant={"outline"}
          disabled={isPending}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            router.push("/listings");
          }}
        >
          Back to Listings
        </Button>
      </div>
    </ListingWrapper>
  );
};
export default ApplicationsPage;
