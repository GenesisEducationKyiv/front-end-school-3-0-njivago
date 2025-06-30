import type { BaseIssue, BaseSchema, InferInput } from "valibot";

export type TApiSchema<
  T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>
> = InferInput<T>;

export type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
};
