import type { TApiSuccessResponse, PreparedResponse } from "../types";
import { flatten, safeParse, type BaseSchema, type BaseIssue } from "valibot";
import type { TApiSchema } from "../types/internal";

const isApiResponse = <T>(value: unknown): value is TApiSuccessResponse<T> => {
  return (typeof value === "object" || Array.isArray(value)) && value !== null;
};

export const validateResponse =
  <T>(
    schema: BaseSchema<unknown, T, BaseIssue<T>>,
    module: string,
    endpoint: string
  ) =>
  (response: TApiSuccessResponse<T>): TApiSuccessResponse<T> => {
    if (!response?.data) {
      return { data: response as T };
    }

    const result = safeParse(schema, response.data);

    if (!result.success) {
      // oxlint-disable-next-line no-console
      console.error(
        `Failed to validate response for ${module}.${endpoint}:`,
        flatten(result.issues)
      );
    }

    return {
      data: result.success ? result.output : response.data,
      meta: response.meta,
    };
  };

export const prepareResponse = <
  T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>
>(
  schema: T,
  module: string,
  endpoint: string
): ((baseQueryReturnValue: unknown) => Promise<PreparedResponse<T>>) => {
  const getResponse = validateResponse(schema, module, endpoint);

  return async (baseQueryReturnValue: unknown) => {
    if (!isApiResponse<TApiSchema<T>>(baseQueryReturnValue)) {
      return { data: null, meta: undefined };
    }

    return await getResponse(baseQueryReturnValue);
  };
};
