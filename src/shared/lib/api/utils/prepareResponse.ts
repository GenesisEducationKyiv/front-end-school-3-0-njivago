import * as Belt from "@mobily/ts-belt";
import type { TApiSuccessResponse, PreparedResponse } from "../types";
import { flatten, safeParse } from "valibot";
import type { BaseSchema, BaseIssue } from "valibot";
import type { TApiSchema } from "../types/internal";

const isApiResponse = <T>(value: unknown): value is TApiSuccessResponse<T> => {
  return (typeof value === "object" || Array.isArray(value)) && value !== null;
};

const validateWithSchema = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<T>>,
  data: unknown,
  module: string,
  endpoint: string
): Belt.Result<T, Error> => {
  const parseResult = Belt.R.fromExecution(() => safeParse(schema, data));

  return Belt.R.flatMap(parseResult, (result) => {
    if (result.success && result.output) {
      return Belt.R.Ok(result.output);
    }

    if (result.issues) {
      // oxlint-disable-next-line no-console
      console.error(
        `Failed to validate response for ${module}.${endpoint}:`,
        flatten(result.issues)
      );
    }

    return Belt.R.Error(
      new Error(`Validation failed for ${module}.${endpoint}`)
    );
  });
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

    const validationResult = validateWithSchema(
      schema,
      response.data,
      module,
      endpoint
    );

    return Belt.R.match(
      validationResult,
      (validatedData) => ({
        data: validatedData,
        meta: response.meta,
      }),
      () => ({
        data: response.data,
        meta: response.meta,
      })
    );
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
    const responseResult = Belt.R.fromNullable(
      baseQueryReturnValue,
      "No response data"
    );

    if (Belt.R.isError(responseResult)) {
      return { data: null, meta: undefined };
    }

    const value = Belt.R.getExn(responseResult);

    if (isApiResponse<TApiSchema<T>>(value)) {
      return getResponse(value);
    }

    return { data: null, meta: undefined };
  };
};
