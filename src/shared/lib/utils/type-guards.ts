/**
 * Type guard to check if a value is a string array
 */
export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

/**
 * Type guard to check if a value is a Record
 */
export const isRecord = <T extends number | string | symbol>(
  value: unknown
): value is Record<T, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Type guard to check if a value is a string or number
 */
export const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === "string" || typeof value === "number";
};
