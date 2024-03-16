import { useRouter } from "next/router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../shadcn/Pagination";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { UsePaginatedQueryResult } from "@/src/requests/usePaginatedQuery";

interface TablePaginationProps {
  query: UsePaginatedQueryResult;
}

const TablePagination = ({ query }: TablePaginationProps) => {
  const router = useRouter();

  const { page: queryPage, pageSize: queryPageSize } = query;

  const count = query?.data?.count ?? 0;

  const page = queryPage ? parseInt(queryPage) : 1;
  const pageSize = queryPageSize ? parseInt(queryPageSize) : 10;

  const nextPage = page * pageSize <= count ?? false;

  return (
    <Pagination className="flex justify-start">
      <PaginationContent>
        <PaginationItem>
          <Link
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page > 1 ? page - 1 : page,
              },
            }}
            className={cn(
              "px-2 py-1 hover:bg-gray-100 rounded flex gap-x-1 items-center text-sm font-medium",
              page === 1 && "text-gray-400 hover:bg-inherit"
            )}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Previous
          </Link>
        </PaginationItem>
        <PaginationItem>
          <Link
            href={{
              pathname: router.pathname,
              query: { ...router.query, page: page + 1 },
            }}
            className={cn(
              "px-2 py-1 hover:bg-gray-100 rounded flex gap-x-1 items-center text-sm font-medium ",
              !nextPage && "text-gray-400 hover:bg-inherit"
            )}
          >
            Next <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
