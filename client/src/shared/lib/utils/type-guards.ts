export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

export const isRecord = <T extends number | string | symbol>(
  value: unknown
): value is Record<T, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === "string" || typeof value === "number";
};
