import { TApiSuccessResponse } from "../types";
import { BaseSchema, BaseIssue, flatten, safeParse } from "valibot";

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

export const prepareResponse = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<T>>,
  module: string,
  endpoint: string
  // ToDo: add type for response for typesafety
): any => {
  const getResponse = validateResponse(schema, module, endpoint);

  return async (response: TApiSuccessResponse<T>) => {
    if (!response) {
      return { data: null, meta: undefined };
    }

    return await getResponse(response);
  };
};
