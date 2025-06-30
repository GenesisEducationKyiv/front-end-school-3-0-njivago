import * as Belt from "@mobily/ts-belt";
import type { AnyVariables, OperationResult } from "urql";

export const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data &&
    "error" in error.data
  ) {
    return String(error.data.error);
  }

  return "An unknown error occurred";
};

export const handleApiRequest = <TData>(
  result: OperationResult<TData, AnyVariables>,
  onSuccess: (data: TData) => void,
  onError: (error: unknown) => void
) => {
  if (result.error) {
    onError(result.error);

    return Belt.R.Error(result.error);
  }

  if (result.data) {
    onSuccess(result.data);

    return Belt.R.Ok(result.data);
  }

  const unknownError = new Error("No data or error received from operation");

  onError(unknownError);

  return Belt.R.Error(unknownError);
};
