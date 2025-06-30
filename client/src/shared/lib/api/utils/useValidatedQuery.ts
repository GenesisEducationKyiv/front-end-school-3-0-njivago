import type { UseQueryArgs } from "urql";
import { useQuery } from "urql";
import type { AnyVariables } from "@urql/core";
import type { BaseSchema, BaseIssue } from "valibot";
import type { UseQueryResult } from "../types/query";
import type { GraphQLResponse } from "../types/base";
import { handleGraphQLError } from "../client";
import { extractValidData } from "./validateResponse";

export const useValidatedQuery = <
  TData,
  TVariables extends AnyVariables = object
>(
  args: UseQueryArgs<TVariables>,
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  module: string,
  endpoint: string
): UseQueryResult<TData | null, TVariables> => {
  const [result, reexecuteQuery] = useQuery<GraphQLResponse<TData>, TVariables>(
    args
  );

  const validatedData = extractValidData(result.data, schema, module, endpoint);

  return [
    {
      ...result,
      error: result.error
        ? (handleGraphQLError(result.error) as any)
        : undefined,
      data: validatedData,
    },
    reexecuteQuery,
  ];
};
