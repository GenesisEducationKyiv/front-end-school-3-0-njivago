/**
 * Type guard to check if a value is a string array
 */
export const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};

/**
 * Type guard to check if a value is a non-empty string array
 */
export const isNonEmptyStringArray = (value: unknown): value is string[] => {
  return isStringArray(value) && value.length > 0;
};

/**
 * Type guard to check if a value is a number array
 */
export const isNumberArray = (value: unknown): value is number[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number")
  );
};

/**
 * Type guard to check if a value is a boolean array
 */
export const isBooleanArray = (value: unknown): value is boolean[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "boolean")
  );
};

/**
 * Type guard to check if a value is a non-null object
 */
export const isNonNullObject = (
  value: unknown
): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

/**
 * Type guard to check if a value is a non-empty object
 */
export const isNonEmptyObject = (
  value: unknown
): value is Record<string, unknown> => {
  return isNonNullObject(value) && Object.keys(value).length > 0;
};

/**
 * Type guard to check if a value is a non-empty string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.length > 0;
};

/**
 * Type guard to check if a value is a valid number
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

/**
 * Type guard to check if a value is a valid date
 */
export const isValidDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

/**
 * Type guard to check if a value is a PreparedResponse with track data
 */
export const isTrackResponse = (
  value: unknown
): value is {
  data: {
    id: string;
    title: string;
    artist: string;
    album: string;
    genres: string[];
    slug: string;
    coverImage: string;
    audioFile: string;
    createdAt: string;
    updatedAt: string;
  };
} => {
  return (
    isNonNullObject(value) &&
    "data" in value &&
    isNonNullObject(value.data) &&
    "id" in value.data &&
    "title" in value.data &&
    "artist" in value.data &&
    "album" in value.data &&
    "genres" in value.data &&
    "slug" in value.data &&
    "coverImage" in value.data &&
    "audioFile" in value.data &&
    "createdAt" in value.data &&
    "updatedAt" in value.data
  );
};
