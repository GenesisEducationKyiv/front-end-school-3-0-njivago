import { useMutation } from "urql";
import type { AnyVariables, TypedDocumentNode } from "@urql/core";
import type { BaseSchema, BaseIssue } from "valibot";
import type { GraphQLResponse } from "../types/base";
import { handleGraphQLError } from "../client";
import { extractValidData } from "./validateResponse";

export const useValidatedMutation = <
  TResp,
  TVars extends AnyVariables = object
>(
  mutationQuery: TypedDocumentNode<TResp, TVars>,
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  module: string,
  endpoint: string
) => {
  const [result, executeMutation] = useMutation<TResp, TVars>(mutationQuery);

  const validatedData = extractValidData(
    result.data as GraphQLResponse<TResp>,
    schema,
    module,
    endpoint
  );

  return [
    executeMutation,
    {
      ...result,
      data: validatedData,
      error: result.error ? handleGraphQLError(result.error) : undefined,
    },
  ] as const;
};
