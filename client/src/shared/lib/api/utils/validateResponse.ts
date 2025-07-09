import { safeParse, flatten } from "valibot";
import type { BaseSchema, BaseIssue } from "valibot";
import type { GraphQLResponse } from "../types/base";

export const extractValidData = <TResponse>(
  response: GraphQLResponse<TResponse> | undefined,
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  module: string,
  endpoint: string
): TResponse | null => {
  if (!response) return null;

  const parsed = safeParse(schema, response);

  if (!parsed.success) {
    // oxlint-disable-next-line no-console
    console.error(
      `❌ Validation failed for ${module}.${endpoint}:`,
      flatten(parsed.issues)
    );
  }

  return parsed.output as TResponse;
};
