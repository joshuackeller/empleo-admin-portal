import { PageComponent } from "../../_app";
import { z } from "zod";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";
import { useRouter } from "next/router";
import useGetListingApplications from "@/src/requests/listings/useGetListingApplications";

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
  const router = useRouter();
  const listingId = router.query.listingId;
  const { data: applications, isFetching } = useGetListingApplications(
    listingId as string
  );

  return (
    <div className="mt-3">
      <ApplicationsTable applications={applications} isFetching={isFetching} />
    </div>
  );
};
export default ApplicationsPage;
