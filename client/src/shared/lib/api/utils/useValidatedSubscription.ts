import { useSubscription } from "urql";
import type {
  AnyVariables,
  SubscriptionHandler,
  UseSubscriptionArgs,
} from "urql";
import type { BaseIssue, BaseSchema } from "valibot";
import { handleGraphQLError } from "../client";
import type { GraphQLResponse } from "../types/base";
import { extractValidData } from "./validateResponse";

export const useValidatedSubscription = <
  TData,
  TVariables extends AnyVariables = object
>(
  args: UseSubscriptionArgs<TVariables, TData>,
  schema: BaseSchema<unknown, TData, BaseIssue<unknown>>,
  module: string,
  endpoint: string,
  handler?: SubscriptionHandler<void, GraphQLResponse<TData>>
) => {
  const [result, reexecuteSubscription] = useSubscription<
    void,
    GraphQLResponse<TData>,
    TVariables
  >(
    {
      ...args,
    },
    handler
  );

  const validatedData = extractValidData(result.data, schema, module, endpoint);

  return [
    {
      ...result,
      data: validatedData,
      error: result.error ? handleGraphQLError(result.error) : undefined,
    },
    reexecuteSubscription,
  ] as const;
};
