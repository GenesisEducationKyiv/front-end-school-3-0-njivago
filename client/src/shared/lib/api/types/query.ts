import type { AnyVariables, UseQueryResponse } from "urql";

export type UseQueryResult<
  TData,
  TVariables extends AnyVariables
> = UseQueryResponse<TData, TVariables>;
