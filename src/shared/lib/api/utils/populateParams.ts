export const populateParams = (params?: unknown) => {
  const replaceParam = (
    endpoint: string,
    [key, value]: [string, unknown]
  ): string => endpoint.replace(`:${key}`, String(value));

  return (endpoint: string): string =>
    params ? Object.entries(params).reduce(replaceParam, endpoint) : endpoint;
};
