import * as Belt from "@mobily/ts-belt";
import type { PartialRecord } from "../types";

// Note: in case of adding react-router or any other router, we need to use it instead of window.location.href

export const getSearchParams = <T extends string>(
  keys: T[]
): PartialRecord<T, string> =>
  Belt.pipe(new URL(window.location.href), (url) =>
    Belt.A.reduce(keys, {}, (acc, key) =>
      Belt.pipe(
        url.searchParams.get(key),
        Belt.O.fromNullable,
        Belt.O.map((value) => ({ ...acc, [key]: value })),
        Belt.O.getWithDefault(acc)
      )
    )
  );

export const setSearchParams = (params: Record<string, string>): void => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  window.history.pushState({}, "", url.toString());
};

export const removeSearchParams = (keys: string[]): void => {
  const url = new URL(window.location.href);
  Belt.A.forEach(keys, (key) => {
    url.searchParams.delete(key);
  });
  window.history.pushState({}, "", url.toString());
};
