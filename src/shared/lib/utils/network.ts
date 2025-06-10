import * as Belt from "@mobily/ts-belt";

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

export const handleApiRequest = async <T extends object>(
  request: Promise<T>,
  onSuccess: (data: T) => void,
  onError: (error: unknown) => void
) =>
  Belt.pipe(
    await Belt.R.fromPromise(request),
    Belt.R.mapError((error) => {
      onError(error);
      return Belt.R.Error(error);
    }),
    Belt.R.flatMap((data) => {
      onSuccess(data);
      return Belt.R.Ok(data);
    })
  );
