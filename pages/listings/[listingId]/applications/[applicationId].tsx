import { Button } from "@/src/components/shadcn/Button";
import useGetApplication from "@/src/requests/applications/useGetApplication";
import { useRouter } from "next/router";

const ListingDetails = () => {
  const router = useRouter();
  const { applicationId, listingId } = router.query;
  const { data, isPending, error } = useGetApplication(applicationId as string);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div>
        <h2>
          {data.firstName} {data.lastName}
        </h2>
        <p>Phone: {data.phone}</p>
        <p>Email: {data.email}</p>
        <p>Updated At: {data.updatedAt}</p>
        <p>Status: {data.Status}</p>
        <p>Internal Notes: {data.ApplicationNote}</p>

        {/* <p>Gender: {data.gender}</p>
        <p>Us Citizen? {data.usCitizen}</p> */}
      </div>
      <div className="flex justify-start mt-3 mb-4">
        <Button
          variant={"outline"}
          disabled={isPending}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            router.push(`/listings/${listingId}/applications`);
          }}
        >
          Back to Applications
        </Button>
      </div>
    </div>
  );
};

export default ListingDetails;
