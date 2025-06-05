import { isRecord } from "shared/lib/utils/type-guards";

export const populateSearchParams = (search?: unknown) => {
  const formatSearchValue = (value: unknown): string => {
    return Array.isArray(value) ? value.join(",") : String(value);
  };

  const buildSearchQuery = (params: Record<string, unknown>): string => {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${formatSearchValue(value)}`)
      .join("&");
  };

  return (endpoint: string): string => {
    if (!isRecord(search)) return endpoint;
    const query = buildSearchQuery(search);
    return query ? `${endpoint}?${query}` : endpoint;
  };
};
