import {
  DefaultError,
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// @ts-ignore
export interface PaginatedQueryParams extends QueryFunctionContext {
  page?: string;
  pageSize?: string;
  sort?: string;
  direction?: string;
  search?: string;
}

export type UsePaginatedQueryResult<
  TData = { data: any[]; count: number },
  TError = DefaultError
> = UseQueryResult<TData, TError> & {
  page: string;
  pageSize: string;
  sort: string;
  direction: string;
  search?: string;
};

const usePaginatedQuery = <
  TQueryFnData = { data: any[]; count: number },
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  queryFn,
  queryKey,
  meta,
  ...props
}: UseQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey
>): UsePaginatedQueryResult<TData, TError> => {
  const router = useRouter();
  const [page, setPage] = useState<string>("1");
  const [pageSize, setPageSize] = useState<string>("10");
  const [sort, setSort] = useState<string>("");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string | undefined>();

  useEffect(() => {
    if (router.query.page) {
      setPage(router.query.page as string);
    }
    if (router.query.pageSize) {
      setPageSize(router.query.pageSize as string);
    }
    if (router.query.sort) {
      setSort(router.query.sort as string);
    }
    if (router.query.direction) {
      setDirection(router.query.direction as "asc" | "desc");
    }
    if (router.query.search) {
      setSearch(router.query.search as string);
    } else {
      setSearch(undefined);
    }
  }, [
    router.query.page,
    router.query.pageSize,
    router.query.sort,
    router.query.direction,
    router.query.search,
  ]);

  useEffect(() => {
    setPage("1");
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: "1",
      },
    });
  }, [search]);

  return {
    page,
    pageSize,
    sort,
    direction,
    search,
    ...useQuery<TQueryFnData, TError, TData, TQueryKey>({
      queryFn: queryFn
        ? () =>
            // @ts-ignore
            queryFn({
              page,
              pageSize,
              sort,
              direction,
              search,
            })
        : undefined,
      queryKey: [...queryKey, page, pageSize, sort, direction, search] as any,
      placeholderData: keepPreviousData,
      ...props,
    }),
  };
};

export default usePaginatedQuery;
