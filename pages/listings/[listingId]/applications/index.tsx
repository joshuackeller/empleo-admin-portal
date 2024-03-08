import { PageComponent } from "../../../_app";
import ApplicationsTable from "@/src/components/tables/ApplicationsTable";
import { useRouter } from "next/router";
import useGetListingApplications from "@/src/requests/listings/useGetListingApplications";
import ListingWrapper from "@/src/layout/wrappers/ListingWrapper";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/shadcn/Pagination";

const ApplicationsPage: PageComponent = () => {
  const router = useRouter();
  const listingId = router.query.listingId;

  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("5"); // This is the number of rows to show per page

  const {
    data: applications,
    isFetching,
    isLoading,
    isError,
  } = useGetListingApplications({
    listingId: listingId as string,
    page,
    pageSize,
  });

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(parseInt(pageSize));
  const rowsPerPage = parseInt(pageSize);
  const totalPages = Math.ceil((applications?.length ?? 0) / rowsPerPage);

  useEffect(() => {
    setEndIndex(startIndex + rowsPerPage);
  }, [startIndex, rowsPerPage]);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && endIndex < (applications?.length ?? 0)) {
      const newEndIndex = Math.min(
        endIndex + rowsPerPage,
        applications?.length ?? 0
      );
      setPage(Math.ceil(newEndIndex / rowsPerPage).toString());
      setStartIndex(endIndex);
      setEndIndex(newEndIndex);
    } else if (direction === "prev" && startIndex > 0) {
      const newStartIndex = Math.max(startIndex - rowsPerPage, 0);
      setPage(
        Math.ceil((newStartIndex + rowsPerPage) / rowsPerPage).toString()
      );
      setEndIndex(startIndex);
      setStartIndex(newStartIndex);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <ListingWrapper>
      <div
        className="mt-3"
        style={{
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <ApplicationsTable
          listingId={listingId as string}
          applications={applications}
          isFetching={isFetching}
        /> */}
        <ApplicationsTable
          listingId={listingId as string}
          applications={applications?.slice(startIndex, endIndex)}
          isFetching={isFetching}
        />
      </div>
      <div style={{ height: "50px", position: "relative" }}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  startIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => handlePageChange("prev")}
              />
            </PaginationItem>
            {Number(page) > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            {Number(page) < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  endIndex >= (applications?.length ?? 0)
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() => handlePageChange("next")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </ListingWrapper>
  );
};
export default ApplicationsPage;
