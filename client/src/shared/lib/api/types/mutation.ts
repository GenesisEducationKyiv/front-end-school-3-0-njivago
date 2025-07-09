import type { AnyVariables, UseMutationResponse } from "urql";

export type UseMutationResult<
  TData,
  TVariables extends AnyVariables
> = UseMutationResponse<TData, TVariables>;
