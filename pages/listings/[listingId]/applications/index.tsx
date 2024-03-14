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

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  const [sortKey, setSortKey] = useState<string | null>(null);

  const handleSort = (columnName: string) => {
    setSortDirection((prevDirection) =>
      columnName === sortKey && prevDirection === "asc" ? "desc" : "asc"
    );
    setSortKey(columnName);
    setStartIndex(0); // Reset startIndex when sorting
  };

  const data = applications?.sort((a, b) => {
    if (sortKey) {
      // const valueA = getValueByPath(a, sortKey);
      // const valueB = getValueByPath(b, sortKey);
      const valueA = a[sortKey as keyof typeof a];
      const valueB = b[sortKey as keyof typeof b];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "boolean" && typeof valueB === "boolean") {
        return sortDirection === "asc"
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
    }
    return 0;
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

  if (isError) return <div>Error</div>;

  return (
    <ListingWrapper>
      <div className="min-h-[300px]">
        <ApplicationsTable
          listingId={listingId as string}
          applications={applications?.slice(startIndex, endIndex)}
          isFetching={isFetching}
          onSort={(columnName) => handleSort(columnName)}
        />
      </div>
      <div className="h-12 mt-5">
        <Pagination className="flex justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  startIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => handlePageChange("prev")}
              />
            </PaginationItem>
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
