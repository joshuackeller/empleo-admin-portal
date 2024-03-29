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

export interface PaginatedQueryParams extends QueryFunctionContext {
  page?: string;
  pageSize?: string;
  sort?: string;
  direction?: string;
}

export type UsePaginatedQueryResult<
  TData = { data: any[]; count: number },
  TError = DefaultError
> = UseQueryResult<TData, TError> & {
  page: string;
  pageSize: string;
  sort: string;
  direction: string;
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
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

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
      setDirection(router.query.direction as 'asc' | 'desc');
    }
  } , [router.query.page, router.query.pageSize, router.query.sort, router.query.direction]);

  return {
    page,
    pageSize,
    sort,
    direction,
    ...useQuery<TQueryFnData, TError, TData, TQueryKey>({
      queryFn: queryFn
        ? () =>
            queryFn({
              page,
              pageSize,
              sort,
              direction,
            } as any)
        : undefined,
        queryKey: [...queryKey, page, pageSize, sort, direction] as any,
      placeholderData: keepPreviousData,
      ...props,
    }),
  };
};

export default usePaginatedQuery;
